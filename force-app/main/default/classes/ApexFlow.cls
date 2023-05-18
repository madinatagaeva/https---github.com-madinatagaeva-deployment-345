public class ApexFlow {
    @InvocableMethod(label='Delete Related Opportunity'
                     description='Delete Related Opportunities with record'
                     category='Account'
    )
        
    public static void deleteOpportuni(List<String> Ids){
        List<Opportunity> oppList = [select Id, AccountId  from Opportunity where AccountId IN :Ids And StageName = 'Closed Won'];
        delete oppList;
    }
}