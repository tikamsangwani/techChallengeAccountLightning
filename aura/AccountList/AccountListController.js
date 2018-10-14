({
    //get Contact List from apex controller
    doInit : function(component, event, helper) {
        helper.getAccountList(component, event);
    },
    
    //Select all contacts
    handleSelectAllAccount: function(component, event, helper) {
        var getID = component.get("v.accountList");
        var checkvalue = component.find("selectAll").get("v.value");        
        var checkAccount = component.find("checkAccount"); 
        if(checkvalue == true){
            for(var i=0; i<checkAccount.length; i++){
                checkAccount[i].set("v.value",true);
            }
        }
        else{ 
            for(var i=0; i<checkAccount.length; i++){
                checkAccount[i].set("v.value",false);
            }
        }
    },
    
    //Process the selected contacts
    handleselectedAccounts: function(component, event, helper) {        
        var selectedAccounts = [];
        var checkvalue = component.find("checkAccount");
        
        if(!Array.isArray(checkvalue)){
            if (checkvalue.get("v.value") == true) {
                selectedAccounts.push(checkvalue.get("v.text"));
            }
        }else{
            for (var i = 0; i < checkvalue.length; i++) {
                if (checkvalue[i].get("v.value") == true) {
                    selectedAccounts.push(checkvalue[i].get("v.text"));
                }
            }
        }
        
        helper.getAccountDetails(component,event,selectedAccounts);
    },
    new : function(component, event, helper) {        
        var createRecordEvent = $A.get("e.force:createRecord");
        createRecordEvent.setParams({
            "entityApiName": "Account"
        });
        createRecordEvent.fire();
    },
    
    edit : function(component, event, helper) {        
        var editRecordEvent = $A.get("e.force:editRecord");
        var docindex = event.currentTarget.name;
       
        editRecordEvent.setParams({
            //"recordId": component.get("v.recordId")
            "recordId": docindex
        });
        editRecordEvent.fire();
    },
    isRefreshed: function(component, event, helper) {
        location.reload();
    },
    deleteRecord : function(component, event, helper){
        var docindex = event.currentTarget.name;
        component.set("v.objAccountId",docindex);
        component.set("v.Type","ALERT!");
        component.set("v.errorMessage","Are you sure?");
        component.set("v.showModal",true);
    },
    deleteRecordBulk : function(component, event, helper){
        // create var for store record id's for selected checkboxes  
        var accountToDeleteId = [];
        // get all checkboxes 
        var getAllId = component.find("checkAccount");
        // If the local ID is unique[in single record case], find() returns the component. not array
        if(! Array.isArray(getAllId)){
            if (getAllId.get("v.value") == true) {
                accountToDeleteId.push(getAllId.get("v.text"));
            }
        }else{
            // play a for loop and check every checkbox values 
            // if value is checked(true) then add those Id (store in Text attribute on checkbox) in accountToDeleteId var.
            for (var i = 0; i < getAllId.length; i++) {
                if (getAllId[i].get("v.value") == true) {
                    accountToDeleteId.push(getAllId[i].get("v.text"));
                }
            }
        }
        if(accountToDeleteId.length > 0)
        {
            component.set("v.Type","ALERT!");
            component.set("v.errorMessage","Are you sure?");
            component.set("v.showModal",true);
        }
        else
        {
            alert('Please select at least one account to delete.');
        }
    },
    deleteCoApp : function(component, event, helper){ 
        
        var accRecord = component.get("v.objAccountId");
        helper.deleteAccount(component,accRecord);
        
    },
    close : function(component, event, helper){  
        component.set("v.Type","!");
        component.set("v.errorMessage","");
        component.set("v.showModal",false);
    },
	    deleteSelected: function(component, event, helper) {
        // create var for store record id's for selected checkboxes  
        var accountToDeleteId = [];
        // get all checkboxes 
        var getAllId = component.find("checkAccount");
        // If the local ID is unique[in single record case], find() returns the component. not array
        if(! Array.isArray(getAllId)){
            if (getAllId.get("v.value") == true) {
                accountToDeleteId.push(getAllId.get("v.text"));
            }
        }else{
            // play a for loop and check every checkbox values 
            // if value is checked(true) then add those Id (store in Text attribute on checkbox) in accountToDeleteId var.
            for (var i = 0; i < getAllId.length; i++) {
                if (getAllId[i].get("v.value") == true) {
                    accountToDeleteId.push(getAllId[i].get("v.text"));
                }
            }
        }
        
        helper.deleteAccountsBulk(component, accountToDeleteId);
    },
    updateRecordBulk: function(component, event, helper) {
        
        // create var for store record id's for selected checkboxes  
        var accountToUpdateId = [];
        // get all checkboxes 
        var getAllId = component.find("checkAccount");
        // If the local ID is unique[in single record case], find() returns the component. not array
        if(! Array.isArray(getAllId)){
            if (getAllId.get("v.value") == true) {
                accountToUpdateId.push(getAllId.get("v.text"));
            }
        }else{
            // play a for loop and check every checkbox values 
            // if value is checked(true) then add those Id (store in Text attribute on checkbox) in accountToDeleteId var.
            for (var i = 0; i < getAllId.length; i++) {
                if (getAllId[i].get("v.value") == true) {
                    accountToUpdateId.push(getAllId[i].get("v.text"));
                }
            }
        }
        if(accountToUpdateId.length > 0)
        {
            component.set("v.updateList",accountToUpdateId);
            console.log('accountToUpdateId====='+accountToUpdateId);
            component.set("v.showModalB1",true);
        }
        else
        {
            alert('Please select at least one account to edit.');
        }
        
    },
        
    refreshAll: function(component, event, helper) {
        //alert('h3');
        var eventType = event.getParam('type');
        var indexCall = 0; // to make it call only 1 time
        if(eventType == 'SUCCESS')
        {
            //doInit(component, event, helper);
            window.location.reload();
        }
    }
 
    
})