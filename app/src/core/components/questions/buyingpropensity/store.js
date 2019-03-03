import  { model }  from './model';
import { observable, action } from "mobx";
import cloner from '../../../services/clone.helper';
const storeName = 'BuyingPropensityStore';
let modelInstance = new model();

class BuyingPropensityStore {
  question;
  propensity;

  constructor (store) {
    if (store) {
      this.question = store;
      this.store = this.getDefaultQuestionData(store);
    } else {
      this.question = {};
      this.store = this.getDefaultQuestionData(store);
    }
    this.propensity = '';
  }

  getDefaultQuestionData (store) {
    return modelInstance.createStore(store);
  }

 logPropensity (context, index) {
  this.propensity = ['Definately', 'Probably', 'Probably Not', 'Not Sure', 'Definately Not'][index];
  context.forceUpdate();
};

  generateID () {
    return Math.random().toString(36).substring(7);
  }

}
export  default  BuyingPropensityStore;
