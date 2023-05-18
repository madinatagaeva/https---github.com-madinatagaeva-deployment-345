import { LightningElement ,wire, track} from 'lwc';
import newFile from '@salesforce/apex/RefreshApex.getOpp';
import { updateRecord } from 'lightning/uiRecordApi';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import{refreshApex} from '@salesforce/apex';
// import oppors from '@salesforce/apex/RefreshApex.getData';
// import oppors2 from '@salesforce/apex/RefreshApex.getName';
// import oppors3 from '@salesforce/apex/RefreshApex.getAll';
const columns = [
    { label: 'Name', fieldName: 'Name' ,editable: true},
    { label: 'Stage', fieldName: 'StageName' ,editable: true},
    { label: 'Amount', fieldName: 'Amount', type: 'currency' ,editable: true},
    { label: 'Close Date', fieldName: 'CloseDate', type: 'date' ,editable: true},
    { label: 'Account Name', fieldName: 'AccName', editable: true, sortable: true, type : 'text' }
];
export default class RefreshApex extends LightningElement {

    columns = columns;

    draftValues=[];
    @track searchName='';
    @track comboName='';
    opps;

    @wire(newFile)
    opps;

    // @wire(newFile,{searchName:'$searchName' , comboName:'$comboName'})
    // wiredOpps({error,data}){
    //     if(data){
    //       this.opps=data;
    //       this.error=undefined;
    //         console.log('data',data)

    //     } else if(error){
    //         this.error=error;
    //         this.opps=undefined;
    //         console.log('error',error)
    //     }
    

  


    
  
    handleSave(event) {
        console.log('event.detail.draftValues',event.detail.draftValues)
       const recordInputs = event.detail.draftValues.slice().map(draft=>{
            const fields = Object.assign({}, draft);
            return { fields }
       })
         console.log('recordInputs', recordInputs);

        const promises = recordInputs.map(record => updateRecord(record));
        Promise.all(promises).then(result => {
            this.showToastMsg('Success', 'Records updated', 'success');
            this.draftValues = [];
            return refreshApex(this.opps);

            
         }).catch(error => {
            this.showToastMsg('Error creating record', error.body.message, error);

         });
         
        }
         showToastMsg(title, message, variant) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Records updated',
                    variant: 'success',
                }),
            );
        }

        // connectedCallback(){

        //     this.showAll()}
          
        
        
           get options(){
            return [ 
                { label: 'Prospecting', value: 'Prospecting' }, 
                { label: 'Qualification', value: 'Qualification' },
                { label: 'Needs Analysis', value: 'Needs Analysis' },
                { label: 'Closed Won', value: '	Closed Won' },
                { label: 'Closed Lost', value: 'Closed Lost' }
            ];
        }
        
        // inputVal;
        //    giveVal    
        // opps;
        // pickList;

        // @wire (oppors,{picklistName:'$pickList'})
        // getcon({data,error}){
        //     if(data){
        //         let temData = JSON.parse(JSON.stringify(data));
        //         temData= temData.map((row)=>{
        //          return {...row, AccName:row.Account.Name}})
        //         this.opps = temData;
        //     }
        //     else{
        //         console.log(error)}
        //     }
         
            Change(event) {
                this.comboName = event.target.value;
            }
          
            // click(){
            //     this.pickList=this.inputVal;
            //     oppors({picklistName:this.pickList}).then (result => {
            //         let temData = JSON.parse(JSON.stringify(result));
            //         temData= temData.map((row)=>{
            //          return {...row, AccName:row.Account.Name}})
            //         this.opps = temData;
            //     }).catc(error => {
            //         console.log(error);
            //     })
            //    }
        
               handleChange(event) {
                this.searchName = event.target.value;
            
            }
        
        //     @wire (oppors2,{accName2:'$giveVal'})
        // getcon({data,error}){
        //     if(data){
        //         let temData = JSON.parse(JSON.stringify(data));
        //         temData= temData.map((row)=>{
        //          return {...row, AccName:row.Account.Name}})
        //         this.opps = temData;
        //         console.log('data',data)
        //     }
        //     else{
        //         console.log(error)}
        //     }
        
        //    showAll(){
        //     oppors3({}).then (result => {
        //         let temData = JSON.parse(JSON.stringify(result));
        //         temData= temData.map((row)=>{
        //          return {...row, AccName:row.Account.Name}})
        //         this.opps = temData;
        //     }
        //     ).catch(error => {
        //         console.log(error);
        //     })
        //    }
        
        //    click2(){
        //     this.showAll();
        //    }
        
        }