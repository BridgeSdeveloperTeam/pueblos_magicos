import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { GoogleAnalytics } from 'ionic-native';
import { CategoriesPage } from '../categories/categories';

import { StateList } from '../../providers/state-list';
import { RestUser } from '../../providers/rest-user';

import { User } from '../../models/user';
import { GlobalValidator } from '../../models/global-validator';

/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

	stateArray: Array<any>;
	user:FormGroup;

	constructor(public navCtrl: NavController, public navParams: NavParams, private stateList: StateList, private formBuilder: FormBuilder, private alertCtrl:AlertController, private restUser:RestUser) {
		stateList.getStateNames().subscribe(res => {
			this.stateArray = <any[]>res.json().estados;
		});

		this.user = this.formBuilder.group({
			nombre: ['', Validators.required],
	    	apellido: ['', Validators.required],				 
	    	correo: ['', Validators.compose([Validators.required, GlobalValidator.mailFormat])],
	    	estado: ['', Validators.required],
	    	edad: ['', Validators.required],
	    	genero: ['', Validators.required],
	    	password: ['', Validators.required],
	    	repeatedPassword: ['', Validators.required]

		});
	}

	ionViewDidEnter () {
		GoogleAnalytics.trackView("Registro");
	}

	submitForm() {
		if(this.user.valid) {
			if(this.user.value.password !== this.user.value.repeatedPassword) {
				this.presentAlert("Advertencia", "Las contraseñas no coinciden.");
			}else {
				this.restUser.registerUser(<User>this.user.value).subscribe(
				(response)=> {
					//response.json() will be the id if new user
					//response.json() will be 0 if email is already registered
					let userId = response.json();
					if(userId == 0) {
						this.presentAlert("Error", "El correo electrónico ya se encuentra registrado.");
					}else {
						this.user.value.id = userId;
						console.log("saving");
						console.log(this.user.value);

						var newUser = this.user.value;
						delete newUser.password;
						delete newUser.repeatedPassword;
						this.restUser.saveUserToStorage(<User>newUser);
						this.navCtrl.setRoot(CategoriesPage);
					}
					
				}, (error) => {
					console.log(error);
				});	
			}
		}else {
			this.presentAlert("Advertencia", "Favor de llenar todos los campos correctamente.");
		}
	}

	private presentAlert(title, message) {
		let alert = this.alertCtrl.create({
			title: title,
			subTitle: message,
			buttons: ['OK']
		});
		alert.present();
	}

}