import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { RestBase } from './rest-base';

/*
  Generated class for the StateList provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class StateList extends RestBase {

	constructor(public http: Http) {
		super();
		
	}

	loadStatesByActivity(activity:string): Observable<any> {
		let servicePath = "/estados_actividad";
		return this.http.get( this.apiUrl + servicePath + "/" + this.getActivityIdfForActivityNumber(activity))
	  		.map(res => res);
	}

	loadStatesByRegion(region:string): Observable<any> {
		let servicePath = "/estados_region";
		return this.http.get(this.apiUrl + servicePath + "/" + this.getRegionIdForRegionNumber(region))
	  		.map(res => res);
	}

	getStateNames(): Observable<any> {
		//Local file
		return this.http.get('./assets/Estados.json').map(res => res);
	}

	getActivityIdfForActivityNumber(activity:string): string {
		switch(activity) {
			case "1":
				//Ecoturismo
				return "1";
			case "2": 
				//Religioso
				return "4";
			case "3":
				//Sol y playa
				return "5";
			case "4":
				//cultural
				return "2";
			case "5":
				//Aventura
				return "3";
			default:
				return "0";
		}
	}

	getRegionIdForRegionNumber(region:string): string {
		switch(region) {
			case "1":
				//Pacifico
				return "4";
			case "2": 
				//Norte
				return "1";
			case "3":
				//Golfo
				return "3";
			case "4":
				//Sur
				return "2";
			case "5":
				//Centro
				return "5";
			default:
				return "0";
		}
	}

	getActivityNamefForActivityNumber(activity:string): string {
		switch(activity) {
			case "1":
				//Ecoturismo
				return "Ecoturismo";
			case "2": 
				//Religioso
				return "Religioso";
			case "3":
				//Sol y playa
				return "Sol y playa";
			case "4":
				//cultural
				return "Cultural";
			case "5":
				//Aventura
				return "Aventura";
			default:
				return "";
		}
	}

	getRegionNameForRegionNumber(region:string): string {
		switch(region) {
			case "1":
				//Pacifico
				return "Pacifico";
			case "2": 
				//Norte
				return "Norte";
			case "3":
				//Golfo
				return "Golfo";
			case "4":
				//Sur
				return "Sur";
			case "5":
				//Centro
				return "Centro";
			default:
				return "";
		}
	}

}
