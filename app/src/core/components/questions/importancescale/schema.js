
 class Model {
   model;
   isLoading;
   editable;
   constructor (store) {
     if (store){
     this.editable = store.store.editable;
     this.model = store.store.model;
   }

   else {
     this.editable = true;
       this.model = {

           name: 'ImportanceScale',
           question : {
             type: 'text',
             value: '',
             errorCode: '',
             errorText: ''
           }
         }
     }
    }
   newOption() {
     return  {
       0  : {
           type: 'text',
           value: '',
           errorCode: '',
           errorText: ''
         },
       1: {
           type: 'text',
           value: '',
           errorCode: '',
           errorText: ''
         }
       }
   }
}




export default Model;
