import { LightningElement, wire, track} from 'lwc';
import oppors from '@salesforce/apex/comboData.getData';
import oppors2 from '@salesforce/apex/comboData.getName';
import oppors3 from '@salesforce/apex/comboData.getAll';
export default class ComboData extends LightningElement {

    // rowOffset = 0;
    // @track sortBy;
    // @track sortDirection;
  
    columns = [
        { label: 'Opportunity Name', fieldName: 'Name', editable: true, sortable: true, type : 'text' },
        { label: 'Stage', fieldName: 'StageName', editable: true, sortable: true, type : 'picklist'},
        { label: 'Type', fieldName: 'Type', editable: true, sortable: true, type : 'picklist'},
        { label: 'Amount', fieldName: 'Amount', editable: true, sortable: true, type : 'currency' },
        { label: 'Account Name', fieldName: 'AccName', editable: true, sortable: true, type : 'text' }
    ];

   connectedCallback(){
    this.showAll()}
  
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

        // doSorting(event){
        //     this.sortBy = event.detail.fieldName;
        //     this.sortDirection = event.detail.sortDirection;
        //     this.sortData(this.sortBy, this.sortDirection);
        // }
        //  sortData(fieldname, direction) {
        //     let parseData = JSON.parse(JSON.stringify(this.data));
        //     let keyValue = (a) => {
        //         return a[fieldname];
        //     };
        //     let isReverse = direction === 'asc' ? 1: -1;
        //     parseData.sort((x,y) => {
        //         x = keyValue(x) ? keyValue(x) : '';
        //         y = keyValue(y) ? keyValue(y) : '';
        //         return isReverse * ((x > y) - (y > x));
        //     });
        //     this.data = parseData;
        // }
    
 
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

   showAll(){
    oppors3({}).then (result => {
        let temData = JSON.parse(JSON.stringify(result));
        temData= temData.map((row)=>{
         return {...row, AccName:row.Account.Name}})
        this.opporti = temData;
    }
    ).catch(error => {
        console.log(error);
    })
   }

   click2(){
    this.showAll();
   }


}