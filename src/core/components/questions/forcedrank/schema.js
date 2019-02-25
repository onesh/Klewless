class Model {
  model;
  isLoading;
  editable;
  constructor(store) {
    this.editable = true;
    this.showEditToggle = true;
    if (store) {
      this.editable = store.store.editable;
      this.showEditToggle = store.store.showEditToggle;
      this.model = store.store.model;
    } else {
      this.editable = true;
      this.showEditToggle = true;
      this.model = {
        name: "FrankQuestion",
        question: {
          type: "text",
          value: "",
          errorCode: "",
          errorText: ""
        },
        options: [
          {
            type: "text",
            value: "",
            errorCode: "",
            errorText: ""
          }
        ]
      };
    }
  }
  newOption() {
    return {
      type: "text",
      value: "",
      errorCode: "",
      errorText: ""
    };
  }
}

export default Model;
