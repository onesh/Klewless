import questionBuilder from "../core/services/questionBuilder";
import { api } from "../core/services/api";

class Model {
  constructor() {}

  createStore(name, testId, store) {
    let Store = questionBuilder.getStore(name, store);
    // send the entire store insead
    return api
      .getData("/createQuestion", {
        store: Store.store,
        name: name,
        testId: testId
      })
      .then(res => {
        Store.question = res.data;
        Store.store = res.data.store;
        return Promise.resolve(Store);
      });
  }

  getStore(name, store) {
    return questionBuilder.getStore(name, store);
  }

  getComponent(name, store, deleteQuestion, saveQuestion) {
    return questionBuilder.getComponent(
      name,
      store,
      deleteQuestion,
      saveQuestion
    );
  }

  getAllComponents(stores, deleteQuestion, saveQuestion) {
    return Promise.resolve(
      questionBuilder.getAllComponents(stores, deleteQuestion, saveQuestion)
    );
  }

  // can add a contract of the data and validation of incoming data with the same contract
  getTest(id) {
    return api.getData("getTest/" + id + "/false", {}, {}, "get");
  }
  saveTest(data) {
    api.getData("/saveTest", data);
  }

  saveQuestion(id, question, testId) {
    return api.getData("/updateQuestion", {
      question: question,
      id: id,
      testId: testId
    });
  }
  deleteQuestion(id, testId) {
    return api.getData("/deleteQuestion", { id: id, testId: testId });
  }

  updateTest(data) {
    api.getData("/updateTest", data);
  }
}

export let model = new Model();
