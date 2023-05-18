public class OpportunityService {
    @Future (callout=true)
    public static void getConvert(set<id> oppIds){
        list<Opportunity> oppList = [select id,Amount, 
                                     Select_Currency_Type__c,
                                      Converted_Amount__c 
                                     from Opportunity 
                                     where id IN:oppIds];
        String enteredAmount;
        String selectedCurrencyType;
        for(Opportunity opp:oppList){
            enteredAmount= String.valueOf(opp.Amount);
            selectedCurrencyType = String.valueOf(opp.Select_Currency_Type__c);
        }
        if(enteredAmount!=null && selectedCurrencyType!=null){
            
            string apikey = '50Siqi3h6BJQjmyKJUPJL9sOTMAuWWiW';
            
            Http p = new Http();
            HttpRequest req = new HttpRequest();
            req.setEndpoint('https://api.apilayer.com/exchangerates_data/convert?to='+selectedCurrencyType+'&from=USD&amount='+enteredAmount+'&apikey='+apikey);
            req.setMethod('GET');
            
            HttpResponse res = new HttpResponse();
            res = p.send(req);
            
            
            Map<String,Object> resT = ( Map<String,Object>) JSON.deserializeUntyped(res.getBody());
            
            Decimal result = (Decimal) resT.get('result');
            oppList[0].Converted_Amount__c = result;
            system.debug(result);
            update oppList;
        }
        
    }
}