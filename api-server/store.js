import  { model }  from './model';
import { observable, action } from "mobx";
import React from 'react';
import cloner from '../core/services/clone.helper'



const storeName = 'Test';

class Test {
  @observable test = {
    stores: [],
    components: [],
    isLoading: true
  };


   @action getTestAndPopulateTest (id) {
    model.getTest(id).then ((test) => {
      this.setTest(test);
    });
    console.log('populate questions', id);
  }

  @action setTestReload (id) {
    this.getTestAndPopulateTest(id);
  }

  @action setTest(test) {
    if (test) {
      let names = [];
      let stores = [];
      let components =  test.stores.map ((store, index) => {
        var storeInstance =  model.createStore(store.store.model.name, store);

        this.test.stores.push(storeInstance);
        storeInstance = this.test.stores[this.test.stores.length -1];
        stores.push(storeInstance);
        return model.getComponent(store.store.model.name, storeInstance, this.deleteQuestion.bind(this));
      });
      test.components = components;
      test.stores = stores;
      this.test = test;
      this.isLoading = false;
    }
  }
  // add a question from right pane
   @action addQuestion (name) {
     try {
       var store =  model.createStore(name);

       //taking reference of the mobx object
       this.test.stores.push(store);
       let index = this.test.stores.length - 1;
       store = this.test.stores[index];
       store.id = this.generateID();

       // push component into the test
       let component = model.getComponent(name, store, this.deleteQuestion.bind(this));
       this.test.components.push(component);

       console.log(`ADDED ${name} type question`);
       this.test = cloner.clone(this.test);
      } catch (err) {
        console.log(`Unable to add ${name} type question`)
     }
  }

  @action enableEditTest (editable) {
    this.test.stores.forEach((ele, i)=>{
      ele.store['editable'] = !ele.store['editable'];
      this.test.editable = ele.store['editable'];
    });
    model.getAllComponents(this.test.stores, this.deleteQuestion.bind(this)).then((components) =>{
      this.test.components = components;
    console.info(`rerendered all questions in the test`);
  });

  }

  @action deleteQuestion (index) {
      this.test.stores.splice(index,1);
      this.test.components.splice(index,1);
      this.test = cloner.clone(this.test);
      this.saveTest();
    }

  @action deleteTest (){
    this.test.stores=[];
    this.test.components=[];
    this.test.editable = true;
    // redundant, doing this because this stuff is not working in prod
    this.test = cloner.clone(this.test);
  }

  @action updateTest  () {
    model.updateTest(this.test);
  }


@action saveTest (test) {
  model.saveTest(this.test);

}

  removeQuestion (index) {

  }

  @action generateID () {
    return Math.random().toString(36).substring(7);
  }

}
export  default  new Test();
