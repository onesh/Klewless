import { observable, action, extendObservable  } from "mobx";
import { api } from '../core/services/api';


class UserStore {
  @observable user = {};

  constructor () {
    api.getData('/user',{})
       .then ((res) => {
         return Promise.resolve(extendObservable(this.user, res));
       })
       .then ((user) => {
         console.log(user);
       })
       .catch ((error) => {
         console.error(error);
       })
  }

  @action updateName(name) {
    this.user.name = name;
  };

  @action logout() {
    api.getData('/logout', {}, {}, 'get')
    .then (function () {
      window.location = 'http://localhost:7777';
    })
  }
}

export default new UserStore()
