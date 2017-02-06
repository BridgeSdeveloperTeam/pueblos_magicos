import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { User } from '../../models/user';

/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

	user:User;
  	constructor(public navCtrl: NavController, public navParams: NavParams) {
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
