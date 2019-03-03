import { api } from "../core/services/api";
import questionBuilder from "../core/services/questionBuilder";

class GiveTestModel {
  constructor() {}

  loadTest(testID) {
    return api
      .getData("getTest/" + testID + "/true", {}, {}, "get")
      .then(data => {
        // only show valid questions in the execution
        let stores = data.stores.filter(store => store.isused);
        return Promise.resolve(stores);
      }).
      then (stores =>  {
        stores = stores.map(store => questionBuilder.getStore(store.store.model.name, store) )
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
