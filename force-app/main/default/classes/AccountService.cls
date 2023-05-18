public class AccountService {
    /**
* we have custom field number of location. whatever number is entered
* the equal number of contacts should be created for that account
* @author madina
*/
    
    public static void insertContacts(list<Account>accListNew){
        Decimal enteredNums=0;
        for(Account acc:accListNew){
            if(acc.NumberofLocations__c>0){
                enteredNums=enteredNums+acc.NumberofLocations__c; 
            }
        }
        List<Contact> conCreated = new List<Contact>();
        if(enteredNums>0){
            for(Account accId:accListNew){
                for(Integer i=0;i<=enteredNums;i++){
                    Contact con = new Contact();
                    con.LastName= 'Contact '+i;
                    con.AccountId=accId.id;
                     conCreated.add(con);
                }
                
            }
        }
        insert conCreated;
    }
        /**
* whenever the account is inserted , if  the phone number is empty , populate it with the default  phone number
 * @author madina
*/
    public static void phonePopulator(List<Account> accNewList){
        for(Account acc:accNewList){
            if(acc.Phone==null){
                acc.Phone='222222222';
            }
        }
        
    }
    
}