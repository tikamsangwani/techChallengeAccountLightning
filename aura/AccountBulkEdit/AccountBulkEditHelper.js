({
	loadPickList : function(component) {
		var action = component.get("c.getAllPicklistMethod");        
        action.setCallback(this, function(result){
            var state = result.getState();
            if (component.isValid() && state === "SUCCESS")
            {
                if(result.getReturnValue()!=undefined){
                    var mapOfPicklist = result.getReturnValue(); 
                    component.set("v.conditionalSanctionOptions", mapOfPicklist['Conditions']);
                                        
                } 
            }
        });
        $A.enqueueAction(action);
	},
    updateAccount : function(component,acclist,source) {
        var action = component.get("c.updateAccounts");
		action.setParams({"setOfAccId":acclist,"accountSource":source
        });        
        action.setCallback(this, function(result){
            var state = result.getState();
            if (component.isValid() && state === "SUCCESS")
            {
                if(result.getReturnValue()!=undefined){
                    var mapOfPicklist = result.getReturnValue(); 
                    component.set("v.conditionalSanctionOptions", mapOfPicklist['Conditions']);
                                        
                } 
            }
        });
        $A.enqueueAction(action);
    }
})