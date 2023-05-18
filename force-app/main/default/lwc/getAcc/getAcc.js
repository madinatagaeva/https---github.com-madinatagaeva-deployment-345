import { LightningElement } from 'lwc';
import getAccounts from "@salesforce/apex/GetAcc.getAccounts";



    const columns = [
        { label: "Name", fieldName: "Name" },
        { label: "Industry", fieldName: "Industry" }
    ];
    
    export default class GetAcc extends LightningElement {
        data = [];
        columns = columns;
    
        async handleClick() {
            try {
                const accounts = await getAccounts();
                this.data = accounts;
            } catch (error) {
                console.error(error);
            }
        }
    }