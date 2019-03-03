import { model } from "./model";
import { observable, action } from "mobx";
import React from "react";
import cloner from "../core/services/clone.helper";

const storeName = "Test";

class Test {
  isLoading = true;
  isPriview = false;
  @observable stores = [];
  @observable components = []


  // called on first time component load

  @action
  getTestAndPopulateTest(id, editable) {
    model.getTest(id).then(test => {
      if (test) {
      let names = [];
      let stores = [];
      let components = test.stores.map((store, index) => {
        // need prototype functions for this store object
        var storeInstance = model.getStore(store.store.model.name, store);

        this.stores.push(storeInstance);
        storeInstance = this.stores[this.stores.length - 1];
        stores.push(storeInstance);
        return model.getComponent(
          store.store.model.name,
          storeInstance,
          this.deleteQuestion.bind(this),
          this.saveQuestion.bind(this)
        );
      });
      Object.keys(test).forEach((key) => this[key] = test[key]);
      this.components = components;
      this.stores = stores;
      this.isLoading = false;

    }
    });
    console.log("populate questions", id);
  }

  @action
  setTest(test) {
    debugger;
    
  }

  // to toggle between edit and preview mode
  @action
  toggleEditMode(flag) {
    this.components = this.stores.map((store, index) => {
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
      var promise = model.createStore(name, this._id);
      promise
        .then(store => {
          this.stores.push(store);
          let index = this.stores.length - 1;
          store = this.stores[index];
          // push component into the test
          let component = model.getComponent(
            name,
            store,
            this.deleteQuestion.bind(this),
            this.saveQuestion.bind(this)
          );
          this.components.push(component);

          console.log(`ADDED ${name} type question`);
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
    this.stores.forEach((ele, i) => {
      ele.store["editable"] = !ele.store["editable"];
    });
    // model
    //   .getAllComponents(
    //     this.stores,
    //     this.deleteQuestion.bind(this),
    //     this.saveQuestion.bind(this)
    //   )
    //   .then(components => {
    //     this.components = components;
    //     console.info(`rerendered all questions in the test`);
    //   });

     console.info(`rerendered all questions in the test`);

  }

  @action
  deleteQuestion(id) {
    model
      .deleteQuestion(id, this._id)
      .then(() => {
        this.stores = this.stores.filter((store, index) => {
          if (store.question._id == id) this.components.splice(index, 1);
          return store.question._id != id;
        });

        // this.test = cloner.clone(this.test);
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
        this.stores.filter(store => store.question._id == id)[0],
        this._id
      )
      .then(res => {
        this.stores.map((store, i) => {
          if (store.question._id == id) {
            storeFromTest = this.stores[i];
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
        this.stores.map((store, i) => {
          if (store.question._id == id) {
            storeFromTest = this.stores[i];

            this.renderSingleQuestion(
              i,
              storeFromTest,
              storeFromTest.question.name,
              error.response.data.value
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
    this.stores[index] = storeFromTest;
    storeFromTest = this.stores[index];

    let component = model.getComponent(
      name,
      storeFromTest,
      this.deleteQuestion.bind(this),
      this.saveQuestion.bind(this)
    );

    this.components[index] = component;
    // this.test = cloner.clone(this.test);
  }

  @action
  deleteTest() {
    this.stores = [];
    this.components = [];
    this.editable = true;
    // redundant, doing this because this stuff is not working in prod
    // this.test = cloner.clone(this.test);
  }

  @action
  updateTest() {
    model.updateTest(this);
  }

  @action
  saveTest(test) {
    model.saveTest(this);
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
