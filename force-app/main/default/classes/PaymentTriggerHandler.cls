public class PaymentTriggerHandler extends TriggerHandler {
  
     private List<Payment_Name__c> newPaymentList;
    private List<Payment_Name__c> oldPaymentList;
    private Map<Id, Payment_Name__c> newPaymentMap;
    private Map<Id, Payment_Name__c> oldPaymentMap;

    public PaymentTriggerHandler() {
        this.newPaymentList = (List<Payment_Name__c>) Trigger.new;
        this.oldPaymentList = (List<Payment_Name__c>) Trigger.old;
        this.newPaymentMap = (Map<Id, Payment_Name__c>) Trigger.newMap;
        this.oldPaymentMap = (Map<Id, Payment_Name__c>) Trigger.oldMap;
    }

    public override void beforeInsert() {
        
       
    }
    
    public override void beforeUpdate() {
              
    }
    
    public override void afterInsert() {
        PaymentService.UpdateTenDueAmount(newPaymentMap.keySet());
         
    }
  
    
    public override void afterUpdate() {
            
    }
      public override void beforeDelete(){
      
            
    }


}