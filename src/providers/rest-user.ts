import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';

import { RestBase } from './rest-base';
import { User } from '../models/user';

/*

  Generated class for the RestUser provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RestUser extends RestBase {

	private storage;

	user:User;

	constructor(public http: Http) {
		super();
		this.storage = new Storage();
		console.log(this.storage);
		this.storage.get("user").then((val) => {
			if(val == null) {
				this.user = <User>{};
			}else{
				this.user = <User>val;
			}
			console.log("user in rest");
			console.log(this.user);
	       	
	    });
	}

	getUser() {
		return this.user;
	}

	registerUser(user:User): Observable<any> {
		//registro_app/email_aqui/nombre_aqui/apellido_aqui/password_aqui/estado_id/edad/genero_id
		let servicePath = "/registro_app";
		return this.http.get( this.apiUrl + servicePath + "/" + this.buildRegisterParameters(user))
	  		.map(res => res);
	}

	private buildRegisterParameters(user:User):string {
		return user.correo + "/" + user.nombre + "/" + user.apellido + "/" + user.password + "/" + user.estado + "/" + user.edad + "/" + user.genero;
	}

	loginUser(email:string, password:string): Observable<any> {
		let servicePath = "/login_app";
		return this.http.get( this.apiUrl + servicePath + "/" + email + "/" + password )
	  		.map(res => res);
	}


	saveUserToStorage(user:User) {
		this.storage.set("user", user);
		this.user = user;
	}

	savePhotoUrl(photoUrl) {
		this.user.imagen = photoUrl;
		this.saveUserToStorage(this.user);
	}

}
