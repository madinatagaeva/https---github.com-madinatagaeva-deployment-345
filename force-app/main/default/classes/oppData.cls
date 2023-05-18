public with sharing class oppData {
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> listData() {
        List<Opportunity>  opp = [SELECT Id, Name, Amount, Account.Name, StageName, CloseDate FROM Opportunity];
        return opp;
}
}