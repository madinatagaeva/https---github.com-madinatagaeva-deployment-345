public class PaymentService {
    //** when user select the user and make payment deduct that amount
    // from tenants overdue amount(update it there)
    // @param  trigger.old 
    // Author Madina togaeva
    
    @future (callout=true)
    public static void UpdateTenDueAmount(set<id>paymentid){
        list<Payment_Name__c>paymentNewList=[select id, tenant__c,Amount__c,
                                             Experation_Date__c,CVV__c,
                                             Credit_Card_Number__c from
                                             Payment_Name__c where id IN:paymentid];
        set<id> tenantId = new  set<id>();
       
        for(Payment_Name__c payment:paymentNewList){
           tenantId.add(payment.tenant__c);
        }
        List<tenant__c> tenantList = [select id, Due_Amount__c from tenant__c where id IN:tenantId];
        for(tenant__c t: tenantList){
            if(t.Due_Amount__c!=null){
            for(Payment_Name__c p: paymentNewList){
                if(t.id==p.tenant__c){
                    t.Due_Amount__c=t.Due_Amount__c-p.Amount__c;
                }
            }
        }
    }
      update  tenantList;          
}
}