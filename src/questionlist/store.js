import  { model }  from './model';
import { observable, action } from "mobx";
import React from 'react';
import CreateTest from '../createtest/store.js'

const storeName = 'QuestionListStore';



class QuestionListStore {
  @observable open = false;
  @observable isLoading = false;


  constructor () {
    let index = 0;
    this.questionTypes = [
        'ScemanticQuestion',
        'FrankQuestion',
        'DichotomousQuestion',
        'BipolarQuestion',
        'BuyingPropensity',
        'ImportanceScale',
        'MatrixTable',
        'ConstantSum',
    ]
  }

@action pushQuestionInTest (index, questionTypes) {
  let question =   questionTypes[index];
  this.addQuestion(question);
}

@action getAllTestNames () {
  return this.questionTypes;
}

@action openDrawer (e) {
  this.open = true;
}

@action closeDrawer (e) {
  this.open = false;
  document.onclick = null; //remove document handler for closing the Drawer
}


  generateID () {
    return Math.random().toString(36).substring(7);
  }

}
export  default  new QuestionListStore();
