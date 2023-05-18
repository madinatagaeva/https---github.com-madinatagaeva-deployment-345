trigger AccountChanged on Account (after update) {
     List<Task> tsk = new List<Task>();
    for(Account acc: Trigger.New){
        if(acc.Rating!=trigger.oldMap.get(acc.id).Rating){
            Task tt=new Task();
            tt.Status='Not Started';
            tt.Subject='Call';
            tt.Priority='High';
            tt.WhatId=acc.Id;
            tsk.add(tt);
        }
    }
    insert tsk;
}