import { model } from "./model";
import { observable, action } from "mobx";
import React from "react";
import cloner from "../core/services/clone.helper";

const storeName = "DL";

class DL {
  @observable
  isLoading = true;
  @observable
  dl = [];
  @observable
  mode = "copypaste";
  @observable
  activeDl = {
    name: "",
    values: []
  };

  @action
  setMode(mode) {
    this.mode = mode;
  }
  //read
  @action
  readDl(id = []) {
    //api call here to read single DL or multiple dl_values
    return model
      .readDl(id)
      .then(dl => {
        if (typeof dl.forEach == "function" && dl.length > 0) {
          this.dl = dl;
          this.activeDl = this.dl[0];
        } else {
          this.activeDl = dl;
        }
        this.isLoading = false;
        return Promise.resolve(dl);
      })
      .catch(err => {
        this.isLoading = false;
        return Promise.reject(err);
      });
  }

  //update
  @action
  updateDl(dl, index) {
    model
      .updateDl(dl)
      .then(dl => {
        this.dl[index] = dl;
      })
      .catch(err => {
        console.error(err);
      });
  }

  //create
  @action
  createDl() {
    model.createDl().then(dl => {
      this.dl.push(dl);
    });
  }

  //delete
  @action
  deleteDl(id, context) {
    model.deleteDl(id).then(dl => {
      this.dl = this.dl.filter(dl => dl._id != id);
      if (context.active_index >= 1) {
        var newActiveElemIndex = context.active_index - 1;
        context.active_index = newActiveElemIndex;
        this.activeDl = this.dl[newActiveElemIndex];
      } else {
        this.activeDl = undefined;
      }
    });
  }

  @action
  generateID() {
    return Math.random()
      .toString(36)
      .substring(7);
  }
}
export default new DL();
