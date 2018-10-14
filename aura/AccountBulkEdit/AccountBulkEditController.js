({
	doInit : function(component, event, helper) {
		helper.loadPickList(component);
	},    
    saveRecord : function(component, event, helper){
        var source = component.get("v.selectedAccountSource");       
        var acclist = component.get("v.selectedAccounts");
        component.set("v.isActive",false);
        helper.updateAccount(component,acclist,source);
        window.location.reload();
       
	},
    onSelectChange : function(component, event, helper) {
        var selected = component.find("ConId").get("v.value");
        component.set("v.selectedAccountSource",selected);
    },
    cancelAccount : function(component, event, helper){  
        component.set("v.isActive",false);
    }
})