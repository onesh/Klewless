import { observable, action } from "mobx";
import React from "react";
import cloner from "../core/services/clone.helper";
import CreateTest from "../createtest/store.js";
import { model } from "./model";

const storeName = "GiveTest";

class GiveTest {
  @observable
  test = {
    questions: [],
    error: {}
  };
  @observable
  isTestLoaded = false;

  @action
  loadTest(testID) {
    model
      .loadTest(testID)
      .then(questions => {
        this.test.questions = questions;
        debugger;
        this.isTestLoaded = true;
      })
      .catch(err => {
        this.test.error = err;
      });
  }
}
export default new GiveTest();
