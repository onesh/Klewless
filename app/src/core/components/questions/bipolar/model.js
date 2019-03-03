import AssembleDataAndBehaviour from "./AssembleDataAndBehaviour";

 class Model {
  constructor() {
  };
  createStore(store) {
    return new AssembleDataAndBehaviour(store);
  }

  getSchema() {
    return new AssembleDataAndBehaviour();
  }

}

export let model = Model;
