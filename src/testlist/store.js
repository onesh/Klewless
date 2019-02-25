import model from "./model.js";
import { observable, action } from "mobx";
import React from "react";
import TestMeta from "../core/components/testmeta";

class TestList {
  @observable
  testlist = [];
  @observable
  activeTest = {};
  @observable
  modal = {
    open: false,
    component: []
  };
  @observable
  sharingComponent;
  @observable
  isLoading = true;

  constructor() {
    if (this.isLoading) this.getAllTest();
  }

  @action
  getAllTest() {
    this.isLoading = true;
    model.getAllTest().then(tests => {
      this.testlist = tests;
      this.isLoading = false;
      console.log(tests);
    });
  }

  @action
  addTest(test) {
    this.testlist[test.id] = test;
    console.info("Saved test to testlist, current tests are: ", this.testlist);
  }

  @action
  createTest() {
    let test = model.getNewTestObject();
    var promise = new Promise((resolve, reject) => {
      this.modal.open = true;
      this.modal.component.push(
        <TestMeta resolve={resolve} reject={reject} test={test} />
      );
    })
      .then(test => {
        this.modal.open = false;
        return model.saveTest(test);
      })
      .then(response => {
        this.getAllTest();
        console.info("Saved test to db");
      })
      .catch(() => {
        this.modal.open = false;
        console.log("Modal closed/cancelled");
      });
  }

  @action
  closeModal() {
    this.open = false;
    this.component.pop();
  }
}

export default new TestList();
