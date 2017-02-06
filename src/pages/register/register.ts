import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { StateList } from '../../providers/state-list';

import { User } from '../../models/user';

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

	stateNames: Array<String>;
	user:User

	constructor(public navCtrl: NavController, public navParams: NavParams, private stateList: StateList) {
		this.stateNames = stateList.getStateNames();
		console.log(this.stateNames);
		this.user = <User>{
	      nombre: "Juan",
	      apellido: "Ramos De La Cruz",
	      imagen: "",
	      correo: "",
	      estado: "",
	      edad: 32,
	      genero: "M"
	    };
	}

}