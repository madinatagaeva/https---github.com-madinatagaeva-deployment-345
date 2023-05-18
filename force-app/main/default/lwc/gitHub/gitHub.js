import { LightningElement } from 'lwc';
import newdata from '@salesforce/apex/GitHub.getApi';
import getLead from '@salesforce/apex/GitHub.createLead';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class GitHub extends NavigationMixin (LightningElement) {
    username;
    result;
    IdLead
    change(event){
        this.username = event.target.value;
    }

    click(){
        newdata({name:this.username})
        .then((res)=>this.result=JSON.parse(res))
        .catch((err)=>console.log(err));
        }
      click2(){
      getLead({
            Name:this.result.name,
            Email:this.result.email,
            Company:this.result.company,
            Website:this.result.url  
      })
      .then((data)=>{
        this.IdLead=data;
        const event = new ShowToastEvent({
            title: 'Success',
            message: data,
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(event);  

      })
        .catch((err)=>{
            console.log(err);
            const event = new ShowToastEvent({
                title: 'message',
                message: err.body.fieldErrors.Company[0].message,
                variant: 'error',
                mode: 'pester'
            });
            this.dispatchEvent(event);  
        })
    }

        click3(){
            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: this.IdLead,
                    objectApiName: 'Lead',
                    actionName: 'view'
                }
            });
        }
    
    }