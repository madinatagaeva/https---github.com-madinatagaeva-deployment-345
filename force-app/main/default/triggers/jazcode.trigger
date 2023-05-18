trigger jazcode on Account (after insert) {
    List <Opportunity> oppList = new  List <Opportunity>();
    for(Account acc:Trigger.New){
       
        Opportunity opp = new Opportunity();
        opp.Name=acc.Name;
            opp.AccountId=acc.Id;
            opp.CloseDate=Date.today().addDays(30);
            opp.StageName='Prospecting';
            opp.Name=acc.Name;
            oppList.add(opp);
        
         
    }
    insert oppList;
}