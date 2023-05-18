public with sharing class RefreshApex {
    
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpp(string searchName , string comboName) {
       string searchResult = '%'+searchName+'%';
        
       return [SELECT id, Name, Amount, CloseDate, StageName FROM Opportunity WHERE Name like :searchResult AND StageName =:comboName WITH SECURITY_ENFORCED];
        
    }

//     @AuraEnabled(cacheable=true)
//     public static List <Opportunity> getData(String picklistName) {
    
//       return  [select id,Name, StageName, CloseDate,Amount, Account.Name  FROM  Opportunity WHERE StageName =:picklistName  WITH SECURITY_ENFORCED];
    
//   }

//   @AuraEnabled(cacheable=true)
//   public static List <Opportunity> getName(String accName2) {
//     string searchResult = '%'+accName2+'%';
//        List<Opportunity> v1 = [select id, Name, StageName, CloseDate,Amount, Account.Name  FROM  Opportunity  WHERE Name like :searchResult WITH SECURITY_ENFORCED];
      
//        return  v1;
  

// }

// @AuraEnabled(cacheable=true)
//   public static List <Opportunity> getAll() {
//      return   [select id,Name, StageName, Amount, CloseDate, Account.Name  FROM  Opportunity WITH SECURITY_ENFORCED limit 30];
  

// }
    
    }