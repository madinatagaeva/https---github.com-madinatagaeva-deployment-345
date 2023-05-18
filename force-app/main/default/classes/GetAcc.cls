public with sharing class GetAcc {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        return [SELECT Name, Industry  FROM Account with security_enforced];
    }
}