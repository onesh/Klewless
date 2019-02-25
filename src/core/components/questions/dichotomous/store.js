import  { model }  from './model';
import { observable, action } from "mobx";
import cloner from '../../../services/clone.helper';
const storeName = 'DichotomousQuestionStore';
let modelInstance = new model();


class DichotomousQuestionStore {
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

    getDefaultQuestionData (store){
      return modelInstance.createStore(store);
    }


      generateID () {
        return Math.random().toString(36).substring(7);
      }

}
export  default DichotomousQuestionStore;
