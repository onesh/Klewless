
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
          name: 'BipolarQuestion',
          question : {
            type: 'text',
            value: '',
            errorCode: '',
            errorText: ''
          },
          options: [
            [ {
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

         ]
        }
      }

   }
   newOption() {
     return [{
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
         }]

   }
}



export default Model;
