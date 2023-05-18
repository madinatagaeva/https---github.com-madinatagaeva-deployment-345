public class firstHTTP {
    
    public static void getData(){
        //HTTP instance
        //http request
        //http response
        Http p = new Http();
        
        HttpRequest req = new  HttpRequest();
        req.setEndpoint('https://th-apex-http-callout.herokuapp.com/animals');
        req.setMethod('GET');
        HttpResponse res = new HttpResponse();
        res = p.send(req);
        
        
        
        //convert to json to object format
       Map<String, Object> sof = ( Map<String, Object>)JSON.deserializeUntyped(res.getBody());
      String animalsName = (String) sof.get('animals');
        system.debug(animalsName);
        
    }

}