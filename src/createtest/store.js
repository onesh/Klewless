import { model } from "./model";
import { observable, action } from "mobx";
import React from "react";
import cloner from "../core/services/clone.helper";

const storeName = "Test";

class Test {
  isLoading = true;
  isPriview = false;
  @observable
  test = {
    stores: [],
    components: []
  };

  // called on first time component load

  @action
  getTestAndPopulateTest(id, editable) {
    model.getTest(id).then(test => {
      this.setTest(test);
    });
    console.log("populate questions", id);
  }

  @action
  setTest(test) {
    if (test) {
      let names = [];
      let stores = [];
      let components = test.stores.map((store, index) => {
        // need prototype functions for this store object
        var storeInstance = model.getStore(store.store.model.name, store);

        this.test.stores.push(storeInstance);
        storeInstance = this.test.stores[this.test.stores.length - 1];
        stores.push(storeInstance);
        return model.getComponent(
          store.store.model.name,
          storeInstance,
          this.deleteQuestion.bind(this),
          this.saveQuestion.bind(this)
        );
      });

      test.components = components;
      test.stores = stores;
      this.test = test;
      this.isLoading = false;
    }
  }

  // to toggle between edit and preview mode
  @action
  toggleEditMode(flag) {
    this.test.components = this.test.stores.map((store, index) => {
      store.store.editable = flag;
      store.question.store = store.store;
      return model.getComponent(
        store.store.model.name,
        store,
        this.deleteQuestion.bind(this),
        this.saveQuestion.bind(this)
      );
    });
    this.isPriview = !flag;
  }

  @action
  setTestReload(id) {
    this.getTestAndPopulateTest(id, true);
  }
  // add a question from right pane
  @action
  addQuestion(name) {
    try {
      var promise = model.createStore(name, this.test._id);
      promise
        .then(store => {
          this.test.stores.push(store);
          let index = this.test.stores.length - 1;
          store = this.test.stores[index];
          // push component into the test
          let component = model.getComponent(
            name,
            store,
            this.deleteQuestion.bind(this),
            this.saveQuestion.bind(this)
          );
          this.test.components.push(component);

          console.log(`ADDED ${name} type question`);
          this.test = cloner.clone(this.test);
        })
        .catch(err => {
          console.error(err);
        });
    } catch (err) {
      console.log(err);
      //taking reference of the mobx object
      console.log(`Unable to add ${name} type question`);
    }
  }

  @action
  enableEditTest(editable) {
    this.test.stores.forEach((ele, i) => {
      ele.store["editable"] = !ele.store["editable"];
      this.test.editable = ele.store["editable"];
    });
    model
      .getAllComponents(
        this.test.stores,
        this.deleteQuestion.bind(this),
        this.saveQuestion.bind(this)
      )
      .then(components => {
        this.test.components = components;
        console.info(`rerendered all questions in the test`);
      });
  }

  @action
  deleteQuestion(id) {
    model
      .deleteQuestion(id, this.test._id)
      .then(() => {
        this.test.stores = this.test.stores.filter((store, index) => {
          if (store.question._id == id) this.test.components.splice(index, 1);
          return store.question._id != id;
        });

        this.test = cloner.clone(this.test);
      })
      .catch(err => {
        console.error(err);
      });
  }

  @action
  saveQuestion(id) {
    let storeFromTest;
    let modelFromError;
    let storeFromResponse;

    model
      .saveQuestion(
        id,
        this.test.stores.filter(store => store.question._id == id)[0],
        this.test._id
      )
      .then(res => {
        this.test.stores.map((store, i) => {
          if (store.question._id == id) {
            storeFromTest = this.test.stores[i];
            debugger;
            this.renderSingleQuestion(
              i,
              storeFromTest,
              storeFromTest.question.name,
              res.data.store
            );
          }
        });
      })
      .catch(error => {
        this.test.stores.map((store, i) => {
          if (store.question._id == id) {
            storeFromTest = this.test.stores[i];

            this.renderSingleQuestion(
              i,
              storeFromTest,
              storeFromTest.question.name,
              error.response.data.error.errors.store.value
            );
          }
        });
      });
  }

  @action
  renderSingleQuestion(index, storeFromTest, name, update) {
    storeFromTest.question.store = update;
    storeFromTest = model.getStore(
      storeFromTest.question.name,
      storeFromTest.question
    );
    this.test.stores[index] = storeFromTest;
    storeFromTest = this.test.stores[index];

    let component = model.getComponent(
      name,
      storeFromTest,
      this.deleteQuestion.bind(this),
      this.saveQuestion.bind(this)
    );

    this.test.components[index] = component;
    this.test = cloner.clone(this.test);
  }

  @action
  deleteTest() {
    this.test.stores = [];
    this.test.components = [];
    this.test.editable = true;
    // redundant, doing this because this stuff is not working in prod
    this.test = cloner.clone(this.test);
  }

  @action
  updateTest() {
    model.updateTest(this.test);
  }

  @action
  saveTest(test) {
    model.saveTest(this.test);
  }

  removeQuestion(index) {}

  @action
  generateID() {
    return Math.random()
      .toString(36)
      .substring(7);
  }
}
export default new Test();
