import axios from "axios";
import loader from "../components/loader/loader";
import modal from "../components/modal/modal";

class Api {
  constructor() {
    this.validTypes = ["get", "post", "delete"];
    this.headers = {};
    this.requestQueue = [];
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
  enqueueRequest (req) {
    if (this.requestQueue.length == 0) loader.showLoader();
   this.requestQueue.push(req);
  }
  dequeueRequest (req) {
    this.requestQueue.pop(req)
    if (!this.requestQueue.length) loader.hideLoader();
  }

  getData(endpoint, payload, header, type) {
    if (!endpoint) Promise.reject(false);
    else {
      let req =  this.apiinstance
        .request({
          url: endpoint,
          method: type || "post",
          baseURL: "http://localhost:7777",
          withCredentials: true,
          data: payload
        })
        .then(res => {
          this.dequeueRequest(req);
          if (res) return Promise.resolve(res.data);
        })
        .catch(err => {
          this.dequeueRequest(req)
          return Promise.reject(err); // to hook custom validation messages/popups and other
        });
      this.enqueueRequest(req);
      return req;
    }
  }
}
export let api = new Api();
