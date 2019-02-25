
import { api } from '../core/services/api';


 class Model {
   model;
   isLoading;
   constructor () {
     this.isLoading = false;
    }

    getNewTestObject () {
      let id = this.generateID();
      return {
           id : id,
           meta: {
             name: '',
             startDate: new Date(),
             expiryDate: new Date(),
             publishDate: new Date(),
             autoPublish: false,
             active: false,
             location: 'lat-long',
             duration: '2 mins', // later
           },
           components : [],
           stores: [],
           editable: true,
           isLoading: false,
         }
    }


      generateID () {
        return Math.random().toString(36).substring(7);
      }

      saveTest (data) {
        return api.getData('/saveTest', data);
      }

      getAllTest () {
        return api.getData('/getAllTest', {});
      }
}




export default new Model();
