import {  LightningElement, api, wire } from 'lwc';
import newOne from '@salesforce/apex/payment.getId';
import newTwo from '@salesforce/apex/payment.getCard';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
import amounCal from '@salesforce/apex/payment.calculateAmount';
import newFour from '@salesforce/apex/payment.getRent';
import sendEmailclass from '@salesforce/apex/payment.sendEmail';
import autoPay from '@salesforce/apex/payment.getSelectedType';
export default class RentPayment extends LightningElement {
    paymnType
    fixAmount
    @api recordId;
    @wire(newFour, {recId:'$recordId'})
    wiredRent({error, data}){
        if(data){
            this.fixAmount = String (data) ;
            console.log(this.fixAmount);
        }
        else if(error){
            console.log(error);
        }
    }

    @wire(autoPay, {recId:'$recordId'})
    selectType({error, data}){
        if(data){
            this.paymnType = String (data) ;
            console.log(this.paymnType);
        }
        else if(error){
            console.log(error);
        }
    }

    
   
    show=true
    showInfo=false
    showPayment=false
    showEnd=false
  
    click1(){
        if(this.paymnType == 'Auto Pay'){
            this.show = true
            this.showInfo = false
        }else{
            this.show = false
            this.showInfo = true
        }
        
    }
     
    
    click2(){   
        newOne({name:this.name, email:this.email, phone:this.phone })
        .then(result => {
            let newFormat = JSON.parse(result)
            this.customerId = newFormat.id
            console.log(this.customerId)
            console.log(newFormat);
         this.showInfo = false
         this.showPayment = true
        })
        .catch(error => {
            console.log(error)
         })
}
   

   
     

            name
            email
            phone
            address
            city
            state
            zip
            customerId
           changeInfo(event){
            if(event.target.name === 'name'){
                this.name = event.target.value
            }
            if(event.target.name === 'email'){
                this.email = event.target.value
            }
            if(event.target.name === 'phone'){
                this.phone = event.target.value
            }
            if(event.target.name === 'address'){
                this.address = event.target.value
            }
            if(event.target.name === 'city'){
                this.city = event.target.value
            }
            if(event.target.name === 'state'){
                this.state = event.target.value
            }
            if(event.target.name === 'zip'){
                this.zip = event.target.value
            }

        }  

        cardNumber
        expMonth
        expYear
        fixAmount
        cusId
        cvc
        currency1
        pymntChange(event){
            if(event.target.name === 'cardNumber'){
                this.cardNumber = event.target.value
                console.log(this.cardNumber)
            }
            else if(event.target.name==='expiryDate'){
                let fullDate = String(event.target.value)
                this.expYear=fullDate.substring(0,4)
                this.expMonth=fullDate.substring(5,7)
                console.log(this.expYear, this.expMonth)
            }
            else if(event.target.name==='amount'){
                this.fixAmount = event.target.value
            }
            else if(event.target.name==='cvc'){
                this.cvc = event.target.value
            }
            
        }

      
     
     transactionNumber
     recepLink
        click3(){

            this.showEnd = true
            this.showPayment=false

            newTwo({cardNumber:this.cardNumber,
                 expMonth:this.expMonth, 
                 cvc:this.cvc, 
                 expYear:this.expYear,
                 cusId:this.customerId,
                 amount:this.fixAmount, 
                 currency1:'USD'
              
          })
       
            .then(result => {
                let newFormat = JSON.parse(result)
                console.log(result);
               this.transactionNumber = newFormat.balance_transaction;
                this.recepLink = newFormat.receipt_url 
                   if(this.transactionNumber){
                    const evt= new ShowToastEvent({
                        title:'Success',
                        message:'Payment Successful',
                        variant:'success'
                    })
                    this.dispatchEvent(evt)

                   }
                   else{
                    const fail= new ShowToastEvent({
                        title:'Failed',
                        message:'Payment Failed',
                        variant:'error'
                    })
                    this.dispatchEvent(fail)
                   }


             })
               
    
        .catch(error => {


            console.log(error)})

     amounCal({recId:this.recordId,
                paidAmount:this.fixAmount })
       .then(result => {console.log(result)
       console.log(this.recordId);
   })
   .catch(error => {
       console.log(error)
   })
   
}
   
        
           click4(){
        sendEmailclass({
            toAddress:'madinatagaeva88@gmail.com',
            subject:'Payment Receipt',
             body:'Your payment receipt is here: '+this.recepLink})
        .then(result => {
            console.log(result);

           }).catch(error => {
            console.log(error)
        })
    }

        }