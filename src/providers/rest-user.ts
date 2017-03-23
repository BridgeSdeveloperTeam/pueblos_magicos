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
		this.storage.get("user").then((val) => {
			if(val == null) {
				this.user = new User();
			}else{
				this.user = <User>val;
			}
	    });
	}

	getUser() {
		return this.user;
	}

	getUserPromise() {
		return this.storage.get("user");
	}

	registerUser(user:User): Observable<any> {
		//registro_app/email_aqui/nombre_aqui/apellido_aqui/password_aqui/estado_id/edad/genero_id
		let servicePath = "/registro_app";
		return this.http.get( this.apiUrl + servicePath + "/" + this.buildRegisterParameters(user))
	  		.map(res => res);
	}

	private buildRegisterParameters(user:User):string {
		return user.correo + "/" + user.nombre + "/" + user.apellido + "/" + user.password + "/" + user.estado_id + "/" + user.edad + "/" + user.genero_id;
	}

	registerUserSocial(firstName, lastName, email): Observable<any> {
		//login_redes/nombre_Aqui/apellido_aqui/correo_aqui
		let servicePath = "/login_redes";
		return this.http.get( this.apiUrl + servicePath + "/" + firstName + "/" + lastName + "/" + email)
	  		.map(res => res);
	}

	loginUser(email:string, password:string): Observable<any> {
		let servicePath = "/login_app";
		return this.http.get( this.apiUrl + servicePath + "/" + email + "/" + password )
	  		.map(res => res);
	}

	updateUser(user:User): Observable<any> {
		///id_aqui/email_aqui/nombre_aqui/apellido_aqui/estado_id/edad_aqui/genero_id
		let servicePath = "/actualizar_datos_usuario";
		return this.http.get( this.apiUrl + servicePath + "/" + this.buildUpdateParameters(user))
	  		.map(res => res);
	}

	private buildUpdateParameters(user) {
		return user.id + "/" + user.email + "/" + user.nombre + "/" + user.apellido + "/" + user.estado_id + "/" + user.edad + "/" + user.genero_id;
	}

	forgotPassword(email:string): Observable<any> {
		let servicePath = "/recuperar_contra";
		return this.http.get( this.apiUrl + servicePath + "/" + email )
	  		.map(res => res);
	}

	saveUserToStorage(user:User) {
		this.storage.set("user", user);
		this.user = user;
	}

	savePhotoUrl(photoUrl) {
		this.user.foto_perfil = photoUrl;
		this.saveUserToStorage(this.user);
	}

	clearStorage() {
  		this.storage.clear().then((val) => {
			this.user = <User>{};
	    });
  	}

  	logId(id: string) {
  		let servicePath = "/logs";
		return this.http.get( this.apiUrl + servicePath + "/" + id)
	  		.map(res => res).subscribe((res) => {},
			(err) => {
				console.log(err);
			});
  	}

}
