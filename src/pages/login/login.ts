import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { CategoriesPage } from '../categories/categories';
import { RegisterPage } from '../register/register';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  loginButtonTapped() {
  	//this.navCtrl.push(CategoriesPage);
    this.navCtrl.setRoot(CategoriesPage);
  }

  registerButtonTapped() {
    this.navCtrl.push(RegisterPage);
  }

}
