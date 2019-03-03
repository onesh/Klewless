import  { model }  from './model';
import { observable, action } from "mobx";
import cloner from '../../../services/clone.helper';
const storeName = 'BipolarQuestionStore';
let modelInstance = new model();

class BipolarQuestionStore {
question;
  constructor (store) {
  if (store) {
    this.question = store;
    this.store = this.getDefaultQuestionData(store);
  } else {
    this.question = {};
    this.store = this.getDefaultQuestionData(store);
  }
  }

  getDefaultQuestionData (store) {
    return modelInstance.createStore(store);
  }

// modelInstance is the modal-helper class instance (each for a question-component)
//  and schema is supposed to be named model as it contains
//  the data, schema (structure and datatype validation) logic, and filter logic (using schema ofcource)

 addOption (context, e) {
  this[this.length] = modelInstance.getSchema().newOption();
  context.forceUpdate();
}

 removeOption (context) {
  delete this[this.length -1] ;
  context.forceUpdate();
}

  generateID () {
    return Math.random().toString(36).substring(7);
  }

}
export  default BipolarQuestionStore;
