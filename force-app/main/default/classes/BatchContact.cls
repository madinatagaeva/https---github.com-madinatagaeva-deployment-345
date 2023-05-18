public class BatchContact implements Database.Batchable <sObject>, Database.AllowsCallouts {
    
    public Database.QueryLocator start(Database.BatchableContext bc){
        
        
        return Database.getQueryLocator('Select id, lastName from Contact');
        
    }
    public void execute(Database.BatchableContext BC, List<Contact> scope) {
       
        for (Contact conn2 : scope) {
            conn2.lastName = 'upadte '+   conn2.lastName;
            
        }
        update scope;
    }
     public void finish(Database.BatchableContext bc){
        // Perform any final batch processing logic here
    }
        
    }