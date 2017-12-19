import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { CustomerProvider } from '../../../providers/customer/customer';
import { CustomerDetailsPage } from '../../customer/details/customer.details';
import { ModalCreateCustomerPage } from '../../customer/create/modal.create.customer';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  customerList: any;

  constructor(
    public navCtrl: NavController,
    public customerProvider: CustomerProvider,
    public modalCtrl: ModalController) {
      this.customerProvider.getCustomerData().subscribe((res) => {
        this.customerList = res;
      })
  }

  public createNewCustomer() {
    let modalCreateCustomer = this.modalCtrl.create(ModalCreateCustomerPage);
    modalCreateCustomer.present();
    modalCreateCustomer.onDidDismiss((data) => {
      if (data) {       
        this.customerList.push(data)
      }      
    })
  }

  public customerDetail(customer) {
    this.navCtrl.push(CustomerDetailsPage, { customer_data: customer })
  }
}
