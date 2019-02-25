import AssembleDataAndBehaviour from "./AssembleDataAndBehaviour";

class Model {
  constructor() {
    this.schema = {};
  }

  createStore(store) {
    return new AssembleDataAndBehaviour(store);
  }

  getSchema() {
    return AssembleDataAndBehaviour;
  }
}

export let model = Model;
