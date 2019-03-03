import  { model }  from './model';
import { observable, action } from "mobx";
import cloner from '../../../services/clone.helper';
const storeName = 'ImportanceScaleStore';
let modelInstance = new model();

class ImportanceScaleStore {
 propensity;
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

 logPropensity (index, context, e) {
  this.propensity = ['Extremely Important', 'Very important', 'Somewhat important', 'Not very important', 'Not at all important'][index];
  context.forceUpdate();
};

  generateID () {
    return Math.random().toString(36).substring(7);
  }

}
export  default  ImportanceScaleStore;
