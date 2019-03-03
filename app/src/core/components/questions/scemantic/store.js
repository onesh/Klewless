import { model } from "./model";
import { observable, action } from "mobx";
import cloner from "../../../services/clone.helper";
const storeName = "ScemanticQuestionStore";
let modelInstance = new model();

class ScemanticQuestionStore {
  question;

  constructor(store) {
    if (store) {
      this.question = store;
      this.store = this.getDefaultQuestionData(store);
    } else {
      this.question = {};
      this.store = this.getDefaultQuestionData(store);
    }
  }

  getDefaultQuestionData(store) {
    return modelInstance.createStore(store);
  }

  @action
  addOption(context, e, store) {
    this[this.length] = modelInstance.getSchema().newOption();
    context.forceUpdate();
  }

  @action
  removeOption(context) {
    delete this.pop();
    context.forceUpdate();
  }

  generateID() {
    return Math.random()
      .toString(36)
      .substring(7);
  }
}
export default ScemanticQuestionStore;
