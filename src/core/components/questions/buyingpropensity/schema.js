
     class Model {
       model;
       constructor (store) {
         if (store){
         this.editable = store.store.editable;
         this.model = store.store.model;
       }

       else {
         this.editable = true;
           this.model = {
               name: 'BuyingPropensity',
               question : {
                 type: 'text',
                 value: '',
                 errorCode: '',
                 errorText: ''
               }

       }
     }
   }

    }




export default Model;
