import React from "react";
import SharingComponent from "../components/sharingComponent";
import SharingComponentStore from "../components/sharingComponent/store.js";

class sharingService {
  constructor() {}
  getComponent(config) {
    SharingComponentStore.isOpen = true;
    SharingComponentStore.setConfigandResolve(config);
    return <SharingComponent />;
  }
}

export default new sharingService();
