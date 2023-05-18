import { LightningElement , api} from 'lwc';

export default class NewChild extends LightningElement {
    
    Change1(event){
        this.dispatchEvent(new CustomEvent('change1',{detail:event.target.value}));
    }
}