import { api } from "../core/services/api";
import questionBuilder from "../core/services/questionBuilder";

class GiveTestModel {
  constructor() {}

  loadTest(testID) {
    return api
      .getData("getTest/" + testID + "/true", {}, {}, "get")
      .then(data => {
        let stores = data.stores.map(store => {
          return questionBuilder.getStore(store.store.model.name, store);
        });
        return Promise.resolve(stores);
      })
      .then(stores => {
        return Promise.resolve(
          questionBuilder.getAllComponents(stores, () => {}, () => {})
        );
      });
  }
}

export let model = new GiveTestModel();
