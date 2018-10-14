public class AccountController
{
    @AuraEnabled
    public static List<Account> getAccounts() {
        return [SELECT Id,Name,AccountNumber,AccountSource,AnnualRevenue,Type,Industry,Owner.Name,CreatedBy.Name 
                                    from Account order By LastModifiedDate DESC LIMIT 10];
    }
    
    @AuraEnabled
    public static void updateAccounts(List<String> setOfAccId, String accountSource) {
        List<Account> lstAccountToUpdate = new List<Account>();
        for(String accId : setOfAccId)
        {
            Account objAccount = new Account(Id = accId);
            objAccount.AccountSource = accountSource;
            lstAccountToUpdate.add(objAccount);
        }
        if(lstAccountToUpdate != null && lstAccountToUpdate .size()>0)
        {
            update lstAccountToUpdate;
        }
    }
    
    @AuraEnabled
    public static List<Account> getAccountDetail(List<String> setOfAccId) {
         //get all contact list
        List<Account> accList = [SELECT Id,Name,AccountNumber,AccountSource,AnnualRevenue,Type,Industry,Description,
                                    Phone,Fax,Owner.Name,CreatedBy.Name,LastModifiedBy.Name,Parent.Name from Account where id in:setOfAccId];
        return accList;
    }
    
    @AuraEnabled
    public static void deleteAccount(String accountId) {
    
        List<Account> lstAccount = [SELECT Id FROM Account WHERE Id =: accountId];
        if(lstAccount != null && lstAccount.size() > 0){
            delete lstAccount;
        }
    }
    
    @AuraEnabled
    public static List<String> deleteAccountBulk(List <String> setOfAccId) {
         // for store Error Messages  
        List < String > oErrorMsg = new List < String > ();
        // Query Records for delete where id in lstRecordId [which is pass from client side controller] 
        List <Account> lstDeleteRec = [select Id from Account where id IN: setOfAccId];
        
        
        Database.DeleteResult[] deleteResult= Database.delete(lstDeleteRec, false);
        // Iterate through each returned result
        for (Database.DeleteResult dr: deleteResult) {
            if (dr.isSuccess()) {
              system.debug('successful delete contact');
             // Operation was successful
            } 
            else {
                // Operation failed, so get all errors   
                oErrorMsg.add('');
                for (Database.Error err: dr.getErrors()) {
                 // add Error message to oErrorMsg list and return the list
                 oErrorMsg.add(err.getStatusCode() + ': ' + err.getMessage());
                }
              }
        }
        return oErrorMsg;
 
     }
     
     @AuraEnabled
    public static  map<String, list<picklistFieldsWrapper>> getAllPicklistMethod(){    
        map<String, list<picklistFieldsWrapper>> allPicklistValues = new map<String, list<picklistFieldsWrapper>>();         
        allPicklistValues.put('Conditions', getPickListValuesCommon('Account', 'AccountSource'));   
         
        return  allPicklistValues; 
     }  
     
     // get schema picklist values
     public static list<picklistFieldsWrapper> getPickListValuesCommon(String sObjectName, String fieldName){
    
        list<picklistFieldsWrapper> Options = new list<picklistFieldsWrapper>();   
        Schema.SObjectType t = Schema.getGlobalDescribe().get(sObjectName);        
        Schema.DescribeSObjectResult r = t.getDescribe();       
        Schema.DescribeFieldResult fieldResult = r.fields.getMap().get(fieldName).getDescribe();
        List<Schema.PicklistEntry> pList = fieldResult.getPicklistValues();
        for (Schema.PicklistEntry p: pList) {
            picklistFieldsWrapper option = new picklistFieldsWrapper();
            option.label = p.getLabel();
            option.value = p.getValue();            
            Options.add(option);
        }
        return Options;
     }
        
     public class picklistFieldsWrapper{
        @AuraEnabled public String label;
        @AuraEnabled public String value;
     }
    }