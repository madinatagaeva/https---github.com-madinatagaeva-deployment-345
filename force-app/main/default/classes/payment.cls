public class payment  {

        @AuraEnabled
        public static string getId(string name, string email , string phone){
        String accessToken = 'sk_test_51MWQaaEync3TZl77WXlph8TAa9pU2euOFw1jJVBHADtu1G9pm4DvCEQmhI1NJCTBHWEUaYYs4JKDvzzdFntiYDTt00VyqBQXTj';
    Http http = new Http();
    
    HttpRequest request = new HttpRequest();
    
    request.setMethod('POST'); 
    
    request.setEndpoint('https://api.stripe.com/v1/customers');
    
    request.setHeader('Content-Type','application/x-www-form-urlencoded');   

    request.setHeader('Authorization','Bearer '+accessToken );
    
    String body = 'name='+name+'&email='+email+'&phone='+phone+'&description=customer';
    
    HttpResponse response = new HttpResponse();
    
    request.setBody(body);
    
    response = http.send(request);
    
    String responseBody = response.getBody();
            system.debug(responseBody);
            return responseBody;
           
     }

     @AuraEnabled

     public static string getCard(
                        string cardNumber, 
                        string expMonth, 
                         string cvc,
                        string expYear,
                      string cusId,
                       string amount,
                        string currency1 ){
    
        String accessToken = 'pk_test_51MWQaaEync3TZl77WaWSJQGpltd3cxb0ceBRwkN4Go82v1ngfTVHh9w662XwHDmkdztLv3MIjaV5a4URh0rnkcmk00mdAhRWK0';
        
        Http http = new Http();
        
        HttpRequest request = new HttpRequest();
        
        request.setMethod('POST');
        
        request.setEndpoint('https://api.stripe.com/v1/tokens');
        
        request.setHeader('Content-Type', 'application/x-www-form-urlencoded');
        
        request.setHeader('Authorization','Bearer '+accessToken);
        
            String bodyRequest = '&card[number]='+cardNumber+'&card[cvc]='+cvc+'&card[exp_month]='+expMonth+'&card[exp_year]='+expYear;
            
            request.setBody(bodyRequest);
        
        HttpResponse response = new  HttpResponse();
          response =  http.send(request);
                            
          String responseBody = response.getBody();  
         map<string,object>data=(map<string,object>)JSON.deserializeUntyped(responseBody);
            string cardID = (string) data.get('id');
                            
           string getjoinId = payment.joinId(cusId, cardID);
           string paymentInfo= payment.requestPayment(amount,currency1,getjoinId);
           return paymentInfo;
        }

        @AuraEnabled
        public static string joinId(string customId, string cdId){
                String accessToken = 'sk_test_51MWQaaEync3TZl77WXlph8TAa9pU2euOFw1jJVBHADtu1G9pm4DvCEQmhI1NJCTBHWEUaYYs4JKDvzzdFntiYDTt00VyqBQXTj';
    
                Http http = new Http();
                HttpRequest request = new HttpRequest();
                request.setEndpoint('https://api.stripe.com/v1/customers/' + customId);
                request.setMethod('POST');
                request.setHeader('Content-Type', 'application/x-www-form-urlencoded');
                request.setHeader('Authorization', 'Bearer ' + accessToken);
                request.setBody('source=' + cdId);
                HttpResponse response = http.send(request);
                String responseBody = response.getBody();
            
                map<string,object> data =( map<string,object>)JSON.deserializeUntyped(responseBody);
                string joinedId = (string) data.get('id');
                return joinedId;
             
        }
    
    @AuraEnabled
         public static string requestPayment(string amount, string currency1, string joinId){
         String accessToken = 'sk_test_51MWQaaEync3TZl77WXlph8TAa9pU2euOFw1jJVBHADtu1G9pm4DvCEQmhI1NJCTBHWEUaYYs4JKDvzzdFntiYDTt00VyqBQXTj';
         
                Http http = new Http();
                HttpRequest request = new HttpRequest();
                request.setEndpoint('https://api.stripe.com/v1/charges');
                request.setMethod('POST');
                request.setHeader('Content-Type', 'application/x-www-form-urlencoded');
                request.setHeader('Authorization', 'Bearer ' + accessToken);
                String newAmount = amount + '00';
                request.setBody('amount=' + newAmount + '&currency=' + currency1 + '&customer=' + joinId);
                HttpResponse response = http.send(request);
                String responseBody = response.getBody();
                system.debug(responseBody);
                return responseBody;
         }

         @AuraEnabled
         public static void calculateAmount(string recId, string paidAmount){
         list<property__c> propList = [select id,Monthly_expense__c, rent__c, Monthly_profit__c from property__c where id=:recId];
            Decimal convertedpaidAmount = Decimal.valueOf(paidAmount);
             
             for(property__c pro : propList){
                
             pro.Monthly_profit__c =convertedpaidAmount-pro.Monthly_expense__c;
              
             }
             
              update propList;
              
             
             }
             @AuraEnabled(cacheable=true)
             public static Integer getRent(string recId){
                list<property__c> propList = [select id,Monthly_expense__c, rent__c, Monthly_profit__c from property__c where id=:recId];
                integer rentfee= Integer.valueOf(propList[0].rent__c);
                return rentfee;
            }
    
               @AuraEnabled(cacheable=true)
             public static String getSelectedType(string recId){
                list<property__c> propList = [select id,Monthly_expense__c, rent__c, Monthly_profit__c, Select_Payment__c from property__c where id=:recId];
                String  selectedType = String.valueOf(propList[0].Select_Payment__c);
                return selectedType;
            }
            @AuraEnabled
            public static void sendEmail(string toAddress, string subject, string body){
                Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
                String[] toAddresses = new String[] {toAddress};
                mail.setToAddresses(toAddresses);
                mail.setSubject(subject);
                mail.setHtmlBody(body);
                Messaging.sendEmail(new Messaging.SingleEmailMessage[]{mail});
            }
           
        }