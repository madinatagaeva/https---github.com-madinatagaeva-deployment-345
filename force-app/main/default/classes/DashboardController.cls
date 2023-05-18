public with sharing class DashboardController {

        @AuraEnabled(cacheable=true)
        public static List<AggregateResult> getOpportunities(){
            return [SELECT SUM(ExpectedRevenue) expectRevenue, SUM(Amount) amount, StageName stage
                   FROM Opportunity  WHERE StageName NOT IN ('Closed Won') GROUP BY StageName];
        }

    
}