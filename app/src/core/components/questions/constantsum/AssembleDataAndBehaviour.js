
     class Model {
       model;
       constructor (store) {
         if (store){
         this.editable = store.store.editable;
         this.model = store.store.model;
         this.showEditToggle = store.store.showEditToggle;
       }

       else {
         this.editable = true;
         this.showEditToggle = true;
           this.model = {

               name: 'ConstantSum',
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
                     max: 10,
                     score: 0,
                     errorCode: '',
                     errorText: ''
                   }
                 ],
                 total: 0
               }
         }
     }

       newOption() {
         return  {
             type: 'text',
             value: '',
             max: 10,
             score: 0,
             errorCode: '',
             errorText: ''
           }
       }
    }




export default Model;
