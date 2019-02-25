import  schema  from './schema'

 class Model {
  constructor() {
    this.schema = {};
  };

  createStore (store) {
    this.schema  = new schema(store);
    return this.schema;
  };

  getSchema() {
    return this.schema;
  }

}

export let model = Model;
