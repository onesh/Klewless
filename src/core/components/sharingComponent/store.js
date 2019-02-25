import React from "react";
import EmailSharingComponent from "../emailSharingComponent";
import { observable, action } from "mobx";
import DLStore from "../../../dl/store.js";
import model from "./model.js";

class TestList {
  @observable
  isOpen = false;
  @observable
  config = {};
  @observable
  activeChannel = {
    component: [],
    index: null
  };

  constructor() {}

  @action
  setVisibility(visibility) {
    this.isOpen = visibility;
  }
  getDlList() {}

  @action
  setConfigandResolve(config) {
    this.config = config;
  }
  @action
  openChannel(index) {
    if (this.config.channels[index] == "email") {
      DLStore.readDl().then(dls => {
        this.activeChannel.index = index;
        this.activeChannel.component = (
          <EmailSharingComponent
            dls={dls}
            onSave={this.onSave}
            testID={this.config.testID}
          />
        );
      });
    }
  }
  @action
  onSave(dls, emails, testID) {
    return model.sendTestLinkToUsers(testID, dls, emails);
  }
}

export default new TestList();
