import { LightningElement, wire} from 'lwc';
import oppors from '@salesforce/apex/LastOneController.getData';
import oppors2 from '@salesforce/apex/LastOneController.getName';
import oppors3 from '@salesforce/apex/LastOneController.getAll';
export default class lastOne extends LightningElement {
  
    columns = [
        { label: 'Opportunity Name', fieldName: 'Name', editable: true, sortable: true, type : 'text' },
        { label: 'Stage', fieldName: 'StageName', editable: true, sortable: true, type : 'picklist'},
        { label: 'Type', fieldName: 'Type', editable: true, sortable: true, type : 'picklist'},
        { label: 'Amount', fieldName: 'Amount', editable: true, sortable: true, type : 'currency' },
        { label: 'Account Name', fieldName: 'AccName', editable: true, sortable: true, type : 'text' }
    ];

//    connectedCallback(){
//     this.showAll()}
  
   inputVal;

   get options(){
    return [ 
        { label: 'Existing Customer-Upgrade', value: 'Existing Customer - Upgrade' }, 
        { label: 'Existing Customer-Replacement', value: 'Existing Customer - Replacement' },
        { label: 'Existing Customer-Downgrade', value: 'Existing Customer - Downgrade' },
        { label: 'New Customer', value: 'New Customer' }
       
    ];
}

inputVal;
   giveVal    
opporti;
pickList;
@wire (oppors,{picklistName:'$pickList'})
getcon({data,error}){
    if(data){
        let temData = JSON.parse(JSON.stringify(data));
        temData= temData.map((row)=>{
         return {...row, AccName:row.Account.Name}})
        this.opporti = temData;
    }
    else{
        console.log(error)}
    }
 
    Change(event) {
        this.inputVal = event.target.value;
    }
  
    click(){
        this.pickList=this.inputVal;
        oppors({picklistName:this.pickList}).then (result => {
            let temData = JSON.parse(JSON.stringify(result));
            temData= temData.map((row)=>{
             return {...row, AccName:row.Account.Name}})
            this.opporti = temData;
        }).catc(error => {
            console.log(error);
        })
       }

       handleChange(event) {
        if(event.target.value){
            this.giveVal = event.target.value;
        }
    }

    @wire (oppors2,{accName2:'$giveVal'})
getcon({data,error}){
    if(data){
        let temData = JSON.parse(JSON.stringify(data));
        temData= temData.map((row)=>{
         return {...row, AccName:row.Account.Name}})
        this.opporti = temData;
    }
    else{
        console.log(error)}
    }

   async click2(){
    try{
        const opprtunity = await oppors3();
        this.opporti = opprtunity;
    }catch(error){
        console.error(error);
    }
    }

}