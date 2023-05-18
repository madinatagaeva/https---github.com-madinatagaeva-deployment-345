import { LightningElement , wire,track} from 'lwc';
// import newFile from '@salesforce/apex/NewApexController.getOpp';
import getName from '@salesforce/apex/NewApexController.getName';
import getAll from '@salesforce/apex/NewApexController.getAll';
import { updateRecord } from 'lightning/uiRecordApi';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import{refreshApex} from '@salesforce/apex';
import newRefresh from '@salesforce/apex/NewApexController.refresh';

const columns = [
    { label: 'Name', fieldName: 'Name' ,editable: true},
    { label: 'Stage', fieldName: 'StageName' ,editable: true},
    { label: 'Amount', fieldName: 'Amount', type: 'currency' ,editable: true},
    { label: 'Close Date', fieldName: 'CloseDate', type: 'date' ,editable: true},
    { label: 'Account Name', fieldName: 'AccName', editable: true, sortable: true, type : 'text' }
];

export default class NewApex extends LightningElement {
    columns = columns;
    draftValues=[];
    searchResult;
    opps;
  
    
    @wire (newRefresh)
    opps;



    @wire(getName,{accName2:'$searchResult'})
    wiredOpps({error,data}){
        if(data){
        let temData = JSON.parse(JSON.stringify(data));
        temData= temData.map((row)=>{
        return {...row, AccName:row.Account.Name}})
        this.opps = temData;
        console.log('opps', this.opps);

        }
            else{
                console.log(error)}
        
        }
     
    handleChange(event){
        if(event.target.value){
        this.searchResult = event.target.value;
    }
}

handleSave(event) {
    
   const recordInputs = event.detail.draftValues.slice().map(draft=>{
        const fields = Object.assign({}, draft);
        return { fields }
   })
     console.log('recordInputs', recordInputs);

    const promises = recordInputs.map(record => updateRecord(record));
    Promise.all(promises).then(result => {
        this.showToastMsg('Success', 'Records updated', 'success');

        
        this.draftValues=[];
        return refreshApex(this.opps);
       
        
     }).catch(error => {
        this.showToastMsg('Error creating record', error.body.message, error);
        })

            
     

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
       async click(){
        try{
            const opportunity = await getAll();
            this.opps = opportunity;
        }catch(error){
            console.error(error);

        }
    }
    }