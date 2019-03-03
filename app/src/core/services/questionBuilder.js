import React from "react";

import ScemanticQuestion from "../components/questions/scemantic";
import BipolarQuestion from "../components/questions/bipolar";
import FrankQuestion from "../components/questions/forcedrank";
import DichotomousQuestion from "../components/questions/dichotomous";
import BuyingPropensity from "../components/questions/buyingpropensity";
import ImportanceScale from "../components/questions/importancescale";
import MatrixTable from "../components/questions/matrixtable";
import ConstantSum from "../components/questions/constantsum";

import ScemanticQuestionStore from "../components/questions/scemantic/store.js";
import BipolarQuestionStore from "../components/questions/bipolar/store.js";
import FrankQuestionStore from "../components/questions/forcedrank/store.js";
import DichotomousQuestionStore from "../components/questions/dichotomous/store.js";
import BuyingPropensityStore from "../components/questions/buyingpropensity/store.js";
import ImportanceScaleStore from "../components/questions/importancescale/store.js";
import MatrixTableStore from "../components/questions/matrixtable/store.js";
import ConstantSumStore from "../components/questions/constantsum/store.js";

class questionBuilder {
  constructor() {}
  getComponent(name, store, deleteQuestion, saveQuestion) {
    if (!name) {
      console.error("Please provide a component name");
    }
    if (name == "ScemanticQuestion")
      return (
        <ScemanticQuestion
          store={store}
          saveQuestion={saveQuestion}
          deletequestion={deleteQuestion}
        />
      );
    if (name == "BipolarQuestion")
      return (
        <BipolarQuestion
          store={store}
          saveQuestion={saveQuestion}
          deletequestion={deleteQuestion}
        />
      );
    if (name == "FrankQuestion")
      return (
        <FrankQuestion
          store={store}
          saveQuestion={saveQuestion}
          deletequestion={deleteQuestion}
        />
      );
    if (name == "DichotomousQuestion")
      return (
        <DichotomousQuestion
          store={store}
          saveQuestion={saveQuestion}
          deletequestion={deleteQuestion}
        />
      );
    if (name == "BuyingPropensity")
      return (
        <BuyingPropensity
          store={store}
          saveQuestion={saveQuestion}
          deletequestion={deleteQuestion}
        />
      );
    if (name == "ImportanceScale")
      return (
        <ImportanceScale
          store={store}
          saveQuestion={saveQuestion}
          deletequestion={deleteQuestion}
        />
      );
    if (name == "MatrixTable")
      return (
        <MatrixTable
          store={store}
          saveQuestion={saveQuestion}
          deletequestion={deleteQuestion}
        />
      );
    if (name == "ConstantSum")
      return (
        <ConstantSum
          store={store}
          saveQuestion={saveQuestion}
          deletequestion={deleteQuestion}
        />
      );
  }

  getStore(name, store) {
    if (name == "ScemanticQuestion") return new ScemanticQuestionStore(store);
    if (name == "BipolarQuestion") return new BipolarQuestionStore(store);
    if (name == "FrankQuestion") return new FrankQuestionStore(store);
    if (name == "DichotomousQuestion")
      return new DichotomousQuestionStore(store);
    if (name == "BuyingPropensity") return new BuyingPropensityStore(store);
    if (name == "ImportanceScale") return new ImportanceScaleStore(store);
    if (name == "MatrixTable") return new MatrixTableStore(store);
    if (name == "ConstantSum") return new ConstantSumStore(store);
  }

  getAllComponents(stores, deleteQuestion, saveQuestion) {
    let components = [];
    components = stores.map((store, index) => {
      return this.getComponent(
        store.store.model.name,
        store,
        deleteQuestion,
        saveQuestion
      );
    });
    return Promise.resolve(components);
  }
}

export default new questionBuilder();
