     class Model {
       model;
       editable;
       constructor (store) {
         if (store){ 
         this.editable = store.store.editable;
         this.model = store.store.model;
       }

       else {
         this.editable = true;
           this.model = {
               name: 'DichotomousQuestion',
               question : {
                 type: 'text',
                 value: '',
                 errorCode: '',
                 errorText: ''
               },
               options: [
                 {
                     type: 'text',
                     value: '',
                     errorCode: '',
                     errorText: ''
                   },
                 {
                     type: 'text',
                     value: '',
                     errorCode: '',
                     errorText: ''
                   }
                 ]
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
