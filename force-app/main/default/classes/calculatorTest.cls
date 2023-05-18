@isTest
private class calculatorTest {
    
     @isTest
    private static void sumMethodTest(){
        Integer result = calculator.sum(5, 2);
             system.assertEquals(7,result);
    }
    
    @isTest
    private static void divideMethodTest(){
       Decimal result1 = calculator.divide(10, 2);
        system.assertEquals(5,result1);
        
    }
    
    @isTest
    private static void lowerCaseConverterTest(){
        String apple = calculator.lowerCaseConverter('abc');
        system.assertEquals('ABC', apple);
    }
    
}