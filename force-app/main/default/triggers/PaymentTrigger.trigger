trigger PaymentTrigger on Payment_Name__c (before insert,before update, before delete, after insert, after update, after delete, after undelete) {
     new PaymentTriggerHandler().run();
}