import { api } from "../core/services/api";

class Model {
  constructor() {}

  readDl(id) {
    if (typeof id == "object") {
      return api
        .getData("/readDl", {}, {}, "get")
        .then(res => {
          return Promise.resolve(res);
        })
        .catch(err => Promise.reject(console.error(err)));
    } else {
      return api
        .getData("/readDl/" + id, {}, {}, "get")
        .then(res => {
          return Promise.resolve(res);
        })
        .catch(err => Promise.reject(console.error(err)));
    }
  }

  deleteDl(id) {
    return api
      .getData("/deleteDl/" + id, {}, {}, "get")
      .then(res => Promise.resolve(res))
      .catch(err => Promise.reject(err));
  }

  updateDl(dl) {
    return api
      .getData("/updateDl", dl, {})
      .then(res => Promise.resolve(res.data))
      .catch(err => Promise.reject(err));
  }
  createDl() {
    debugger;
    return api.getData("/createDl", {}).then(dl => {
      return Promise.resolve(dl.data);
    });
  }
}

export let model = new Model();
