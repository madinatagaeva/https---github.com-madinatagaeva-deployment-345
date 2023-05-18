import { LightningElement, wire, track} from 'lwc';
import opport from '@salesforce/apex/oppData.listData';
export default class OppData extends LightningElement {

   
    columns = [
        { label: 'Name', fieldName: 'Name', editable: true , sortable: true},
        { label: 'Stage', fieldName: 'StageName',editable: true,sortable: true },
        { label: 'ClosedDate', fieldName: 'CloseDate',editable: true, sortable: true },
        { label: 'Amount', fieldName: 'Amount',editable: true, sortable: true },
        { label: 'Account', fieldName: 'Account.Name',editable: true, sortable: true },

    ];
    rowOffset = 0;
    @track data;
    @track sortBy;
    @track sortDirection;

    @wire(opport) 
    oppotunities(result) {
        if (result.data) {
            this.data = result.data;
            this.error = undefined;
        } else if (result.error) {
            this.error = result.error;
            this.data = undefined;
        }
    }

    doSorting(event) {
        this.sortBy = event.detail.fieldName;
        this.sortDirection = event.detail.sortDirection;
        this.sortData(this.sortBy, this.sortDirection);
    }
     sortData(fieldname, direction) {
        let parseData = JSON.parse(JSON.stringify(this.data));
        let keyValue = (a) => {
            return a[fieldname];
        };
        let isReverse = direction === 'asc' ? 1: -1;
        parseData.sort((x,y) => {
            x = keyValue(x) ? keyValue(x) : '';
            y = keyValue(y) ? keyValue(y) : '';
            return isReverse * ((x > y) - (y > x));
        });
        this.data = parseData;
    }
}