public with sharing class comboData {
    @AuraEnabled(cacheable=true)
    public static List <Opportunity> getData(String picklistName) {
  List <Opportunity> newop=[select Name, StageName, Amount, Type, Account.Name  FROM  Opportunity where Type=:picklistName];
    return newop;
  }
  @AuraEnabled(cacheable=true)
  public static List <Opportunity> getName(String accName2) {
    string searchResult = '%'+accName2+'%';
List <Opportunity> newop2=[select Name, StageName, Amount, Type, Account.Name  FROM  Opportunity where Name like :searchResult];
  return newop2;

}

@AuraEnabled(cacheable=true)
  public static List <Opportunity> getAll() {
    List <Opportunity> newop3=[select Name, StageName, Amount, Type, Account.Name  FROM  Opportunity];
  return newop3;

}
}