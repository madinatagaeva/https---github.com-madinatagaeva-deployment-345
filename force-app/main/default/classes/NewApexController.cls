public with sharing class NewApexController {
       @AuraEnabled
      public static List <Opportunity> getName(String accName2) {
        string searchResult = '%'+accName2+'%';
           List<Opportunity> v1 = [select id, Name, StageName, CloseDate,Amount, Account.Name  FROM  Opportunity  WHERE Name like :searchResult WITH SECURITY_ENFORCED];
          
           return  v1;
       }

       @AuraEnabled
  public static List <Opportunity> getAll() {
    return [select id, Name, StageName, Amount, CloseDate, Account.Name  FROM  Opportunity   WITH SECURITY_ENFORCED];
 }

 @AuraEnabled
 public static List <Opportunity> refresh() {
   return [select id, Name, StageName, Amount, CloseDate, Account.Name  FROM  Opportunity   WITH SECURITY_ENFORCED];
}
        
}