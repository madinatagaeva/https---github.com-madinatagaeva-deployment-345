public with sharing class GitHub {
    @AuraEnabled
    public static String getApi(String name) {
        Http h = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://api.github.com/users/'+name);
        req.setMethod('GET');
        HttpResponse res = new HttpResponse();
         res= h.send(req);
        return res.getBody();

    }
    @AuraEnabled
    public static Id createLead(String Name, String Email, String website) {
        Lead l = new Lead();
        l.LastName = Name;
        l.Company = Name;
        l.Email = Email;
        l.website = website;
        insert l;
        return l.Id;
    }
}