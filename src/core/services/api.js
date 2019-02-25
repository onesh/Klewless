import axios from "axios";
import loader from "../components/loader/loader";
import modal from "../components/modal/modal";

class Api {
  constructor() {
    this.validTypes = ["get", "post", "delete"];
    this.headers = {};

    this.apiinstance = axios.create({
      baseURL: "http://localhost:7777",
      timeout: 50000
    });
  }

  setHeader(key, value) {
    this.headers[key] = value;
  }

  getHeader(key) {
    return this.header[key];
  }

  getData(endpoint, payload, header, type) {
    loader.showLoader();
    if (!endpoint) Promise.reject(false);
    else {
      return this.apiinstance
        .request({
          url: endpoint,
          method: type || "post",
          baseURL: "http://localhost:7777",
          withCredentials: true,
          data: payload
        })
        .then(res => {
          loader.hideLoader();
          modal.hideModal();
          if (res) return Promise.resolve(res.data);
        })
        .catch(err => {
          loader.hideLoader();
          modal.showModal(err.response.data.message);
          return Promise.reject(err); // to hook custom validation messages/popups and other
          // Modal here
        });
    }
  }
}
export let api = new Api();
