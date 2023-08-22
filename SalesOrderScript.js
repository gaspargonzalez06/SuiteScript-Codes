/**
 * @NApiVersion 2.0
 * @NScriptType ClientScript 
 *  @NModuleScope Public
 */



define ([],function(){
    function pageInit(context){
        var currentRecord = context.currentRecord;
        // currentRecord.setValue({
        //     fieldId :'salesrep',
        //     value : 'Alex Wolfe'
        // });

    currentRecord.setValue({
            fieldId :'otherrefnum',
            value : '20000'
        });
    
         currentRecord.setValue({
            fieldId :'memo',
            value : 'prueba script'
        });
//    currentRecord.setValue({
//             fieldId :'subsidiary',
//             value : 'La Esperanza'
//         });

//   currentRecord.setValue({
//             fieldId :'postingperiod',
//             value : 'Periodo #1'
//         });


    }


return {
    pageInit:pageInit,
};

}
)