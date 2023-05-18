trigger hiiiiiii on Account (before insert, before update) {
    for(Account a : Trigger.new) {
        if(a.Name == null) {
            a.Name = 'Default Name';
        }
    }
}