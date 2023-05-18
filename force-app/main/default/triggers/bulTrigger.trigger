trigger bulTrigger on Account (before insert) {
    Account a = Trigger.new[0];
        a.Description = 'new Description';
    
}