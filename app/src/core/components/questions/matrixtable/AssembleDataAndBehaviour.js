
 class Model {
   model;
   editable;
   isLoading;
   constructor (store) {
     this.editable = true;
     if (store){
     this.editable = store.store.editable;
     this.model = store.store.model;
     this.showEditToggle = store.store.showEditToggle;

   }

   else {
     this.editable = true;
     this.showEditToggle = true;

       this.model = {

           name: 'MatrixTable',
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
               }

           ]
         }

     }

   }
   newOption() {
     return  {
       criteria : {
         type: 'text',
         value: '',
         errorCode: '',
         errorText: ''
       }
     }
   }
}




export default Model;
