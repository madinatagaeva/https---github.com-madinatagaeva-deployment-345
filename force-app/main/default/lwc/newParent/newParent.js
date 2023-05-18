import { LightningElement , track} from 'lwc';

export default class NewParent extends LightningElement {
     message='';
    Value(event){
        this.message=event.detail;
    }
}