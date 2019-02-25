import  { model }  from './model';
import { observable, action } from "mobx";
import cloner from '../../../services/clone.helper';
const storeName = 'ConstantSumStore';
let modelInstance = new model();


class ConstantSumStore {
  question;
  total;
  check;

  constructor (store) {
    if (store) {
      this.question = store;
      this.store = this.getDefaultQuestionData(store);
      this.total = store.total;
      this.check = store.check;
    } else {
      this.question = {};
      this.store = this.getDefaultQuestionData(store);
      this.total = 0;
      this.check = 0;
    }
    if (!store) {
    } else {
    }
  }



  getDefaultQuestionData (store) {
    return modelInstance.createStore(store);
  }

 addOption (context,e) {
  this[this.length] =  modelInstance.getSchema().newOption();
  context.forceUpdate();
}

 removeOption (context,e) {
  delete this.pop();
  context.forceUpdate();
}


 setValue (key, context, total, e) {
  let value = e.target.value;
  // this.options[key].value = value;
  // set max for this logic, here
  let sum = 0;
  debugger;
  Object.keys(this.options).forEach((index) => {
    sum = sum + Number(this.options[index].score);
  });


    if (total - sum > 0) {
      this.options[key].score = Number(e.target.value);
    } else {
      if (Number(e.target.value) < this.options[key].score) {
        this.options[key].score = Number(e.target.value);
      } else {
        e.target.value = this.options[key].score;
      }
    }

  context.forceUpdate();

  // set max for options logic here
}

 setTotal (context, e) {
    this.total = Number(e.target.value);
    context.forceUpdate();

  }

  generateID () {
    return Math.random().toString(36).substring(7);
  }

}
export  default ConstantSumStore;
