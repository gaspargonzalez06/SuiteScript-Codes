/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
define(['N/ui/serverWidget', 'N/record', 'N/search'], function (serverWidget, record, search) {
    function onRequest(context) {
        if (context.request.method === 'GET') {
            var form = serverWidget.createForm({
                title: 'User Information from Pospan'
            });

            var fieldContainer = form.addFieldGroup({
                id: 'fieldContainer',
                label: 'Field Container',
            });

            var nameField = form.addField({
                id: 'nameid',
                type: serverWidget.FieldType.TEXT,
                label: 'Name',
                container: 'fieldContainer'
            });
            nameField.isMandatory = true;

            var idField = form.addField({
                id: 'fieldid',
                type: serverWidget.FieldType.TEXT,
                label: 'Id Number separated whit(-)',
                container: 'fieldContainer'
            });
            idField.isMandatory = true;

            var ageField = form.addField({
                id: 'ageid',
                type: serverWidget.FieldType.TEXT,
                label: 'Age',
                container: 'fieldContainer'
            });
            ageField.isMandatory = true;

            var montoField = form.addField({
                id: 'montoid',
                type: serverWidget.FieldType.TEXT,
                label: 'Monto de ahorro',
                container: 'fieldContainer'
            });
            montoField.isMandatory = true;

            var educationField = form.addField({
                id: 'selected_education',
                type: serverWidget.FieldType.SELECT,
                label: 'Select Education',
                container: 'fieldContainer',
                source: 'customlisteducationtypepospan'
            });

            form.addResetButton({
                label: 'Reset Button'
            });
            form.addSubmitButton({
                label: 'Submit Button'
            });

            context.response.writePage(form);
        } else if (context.request.method === 'POST') {
            var request = context.request;
            var lname = request.parameters.nameid;
            var idnumber = request.parameters.fieldid;
            var age = request.parameters.ageid;
            var monto = parseFloat(request.parameters.montoid);
            var education = request.parameters.selected_education;

            var existingRecordId = findExistingRecordId(idnumber);

            if (existingRecordId) {
                var existingRecord = record.load({
                    type: 'customrecord1399',
                    id: existingRecordId
                });

                var existingAmount = parseFloat(existingRecord.getValue('custrecord1428'));
                var newTotal = existingAmount + monto;

                existingRecord.setValue({
                    fieldId: 'custrecord1428',
                    value: newTotal
                });
                existingRecord.setValue({
                    fieldId: 'custrecord1429',
                    value: monto
                });

                existingRecord.save({
                    enableSourcing: false,
                    ignoreMandatoryFields: false
                });
            } else {
                var newRecord = record.create({
                    type: 'customrecord1399',
                    isDynamic: true
                });

                newRecord.setValue({
                    fieldId: 'name',
                    value: lname
                });
                newRecord.setValue({
                    fieldId: 'custrecord1426',
                    value: age
                });
                newRecord.setValue({
                    fieldId: 'custrecord1430',
                    value: idnumber
                });
                newRecord.setValue({
                    fieldId: 'custrecord1427',
                    value: education
                });
                newRecord.setValue({
                    fieldId: 'custrecord1428',
                    value: monto
                });
                newRecord.setValue({
                    fieldId: 'custrecord1429',
                    value: monto
                });

                newRecord.save({
                    enableSourcing: false,
                    ignoreMandatoryFields: false
                });


            }

            // Mostrar mensaje o redireccionar
            // ...
        }
    }

    function findExistingRecordId(idnumber) {
        var customRecordSearch = search.create({
            type: 'customrecord1399',
            filters: [
                search.createFilter({
                    name: 'custrecord1430',
                    operator: search.Operator.IS,
                    values: idnumber
                })
            ]
        });

        var searchResults = customRecordSearch.run().getRange({
            start: 0,
            end: 1
        });

        if (searchResults.length > 0) {
            return searchResults[0].id;
        }

        return null;
    }

    return {
        onRequest: onRequest
    };
});



// /**
//  * @NApiVersion 2.x
//  * @NScriptType Suitelet
//  * @NScriptType MassUpdateScript
//  */



// define (['N/email','N/runtime','N/ui/serverWidget','N/record','N/http'],function(email,runtime,serverWidget,record,http){
//     function onRequest(context){


//         if (context.request.method === 'GET' ){

//             var form = serverWidget.createForm({
//                 title : 'User Information from Pospan'
//             });
//             var fieldContainer = form.addFieldGroup({
//                 id :'fieldContainer',
//                 label :'Field Container',

//             });
    
    
//             var nameField = form.addField({
//                 id :'nameid',
//                 type : serverWidget.FieldType.TEXT,
//                 label : 'Name',
//                 container:'fieldContainer'
//             });

//            nameField.isMandatory = true ;
    
    
//             var ageField = form.addField({
//                 id : 'ageid',
//                 type : serverWidget.FieldType.TEXT,
//                 label : 'Age',
//                 container:'fieldContainer'
//             });
//            ageField.isMandatory = true ;
    
//            var montoField = form.addField({
//             id : 'montoid',
//             type : serverWidget.FieldType.TEXT,
//             label : 'Monto de ahorro',
//             container:'fieldContainer'
//         });
            
//             montoField.isMandatory = true ;

    
    
//             var field = form.addField({
//                 id :'selected_education',
//                 type : serverWidget.FieldType.SELECT,
//                 label: 'Select Education',
//                 source:'customlisteducationtypepospan' 
//             });
//             // var sublist = form.addSublist({
//             //     id :'sublistid',
//             //     type : serverWidget.SublistType.INLINEEDITOR,
//             //     label: 'Inline Editor Sublist',
//             // });
    
//             // sublist.addField({
//             //     id :'sublist2',
//             //     type : serverWidget.FieldType.TEXT,
//             //     label: 'Some Text',
//             // });
//             // sublist.addField({
//             //     id :'ssublist3',
//             //     type : serverWidget.FieldType.TEXTAREA,
//             //     label: 'Small Description',
//             // });
    
//             // sublist.addField({
//             //     id :'sublist4',
//             //     type : serverWidget.FieldType.DATE,
//             //     label: 'Date',
//             // });
    
    
    
    
//             form.addResetButton({
//                 label:'Reset Button'
//             });
//             form.addSubmitButton({
//                 label:'Submit Button'
//             });
            
    
//             context.response.writePage(form);

//         }
//         else
//             {
//                 var request = context.request;
//                 //var currentuser = runtime.getCurrentUser().id;
//                 var lname = request.parameters.nameid;
//                 var age = request.parameters.ageid;
//                 var monto = request.parameters.montoid;
//                 var education = request.parameters.selected_education;
                
//             //var total =  parseFloat(monto).toFixed(2)+10000;

           

//             var record1 = record.getValue({
//                 type: 'customrecord1399',
             
//             });




            

//             var customRecord = record.create({
//                 type: 'customrecord1399',
//                 isDynamic : true
//             });
            



//             customRecord.setValue({
//                 fieldId: 'custrecordnameid',
//                 value:lname
                
//             });
//             customRecord.setValue({
//                 fieldId: 'name',
//                 value:lname
                
//             });
         
//             customRecord.setValue({
//                 fieldId: 'custrecord1426',
//                 value:age
                
//             });
//             customRecord.setValue({
//                 fieldId: 'custrecord1427',
//                 value:education
                
//             });
//             customRecord.setValue({
//                 fieldId: 'custrecord1429',
//                 value:monto
                
//             });

//             customRecord.setValue({
//                 fieldId: 'custrecord1428',
//                 value:monto
                
//             });

//             // var myAction = action.get({
//             //     recordType: 'timebill',
//             //     id: 'approve'
//             // });

       
        

//             var recordId = customRecord.save({
//                 enableSourcing: false ,
//                 ignoreMandatoryFields: false
//             });
            


//         }
      
//     }

//     function each(params){
//         let listRecord = record.loan({
//             type:params.type,
//             id :params.id
//         });

//         if(params.value == lname){
//             listRecord.setValue()
//         }
    

        
//     }

//     return {
//         onRequest : onRequest,

//     };


// }
// );


