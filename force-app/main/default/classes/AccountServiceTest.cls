@isTest
public class AccountServiceTest {
    @isTest
    static void  phonePopulatorTest(){
        Account acc= new Account();
        acc.Name='ABC Test';
        acc.Phone='222222222';
        insert acc;
        
        List<Account> accList=[select Name,Phone from Account];
        
        //chek if the account phone number populated or not.
        system.assertEquals('222222222', accList[0].Phone);
        
    }
    
    @isTest
    static void avoidDeletion(){
        //insert 1 account with contact
        Account acc = new Account();
        acc.Name = 'Test';
        insert acc;
        
         Contact con = new Contact();
        con.LastName = 'Contact One';
        con.AccountId=acc.Id;
        insert con;
        //insert 1 account without contact
           Account acc2 = new Account();
        acc2.Name = 'Test2';
        insert acc2;
        
        List<Account>accList = [select Name, Phone from Account];
        system.debug(accList);
        
        delete accList[0];
    }

}