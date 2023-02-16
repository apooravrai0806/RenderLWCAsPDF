import getCase from '@salesforce/apex/CaseController.getCase';
import { LightningElement,api,track,wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';



export default class AccountListView extends NavigationMixin(LightningElement){
    @track columns = [
        { label: 'Case Num', fieldName: 'CaseNumber' },
        { label: 'Origin', fieldName: 'Origin' }
    ];
    
    objectName = 'Case';

    @track data;
    days = 7;
    selectedView = 'last7Days';
    selectListView ='Last 7 Days';


    @wire(getCase,{days : '$days'})
    response({data,error}){
        if(data){
            this.data = data;
            console.log('data---->',JSON.stringify(this.data));
        }
        else{
            console.log('error--->',error);
        }
    }

    handleMenuSelect(event){
        console.log('ListViewSelected--->',JSON.stringify(event.detail.value));
        this.selectListView = event.detail.value == 'last365Days' ? 'Last 1 Years' : event.detail.value == 'last730Days' ? 'Last 2 Years' : 'Last 7 Days';;
        this.days = event.detail.value == 'last365Days' ? 365 : event.detail.value == 'last730Days' ? 730 : 7;
    }
    handleOnClick(){
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: '/apex/caseAsPDF?listView='+this.days
            }
        },
        true // Replaces the current page in your browser history with the URL
      );

    }
}