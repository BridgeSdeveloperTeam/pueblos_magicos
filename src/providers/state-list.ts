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

	servicePath : string;
	stateNames: Array<String>;

	constructor(public http: Http) {
		super();
		this.servicePath = "/estados_region";
		//Local file
		this.http.get('./assets/Estados.json').map(res => res).subscribe( res => {
			let jsonResponse = res.json();
			this.stateNames = <String[]>jsonResponse["Estados"];	
		});
	}

	loadStatesByActivity(activity:string): Observable<any> {
		return this.http.get( this.apiUrl + this.servicePath + "/" + this.getActivityIdfForActivityNumber(activity))
	  		.map(res => res);
	}

	loadStatesByRegion(region:string): Observable<any> {
		return this.http.get(this.apiUrl + this.servicePath + "/" + this.getRegionIdForActivityNumber(region))
	  		.map(res => res);
	}

	getStateNames():Array<String> {
		return this.stateNames;
	}

	private getActivityIdfForActivityNumber(activity:string): string {
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

	private getRegionIdForActivityNumber(region:string): string {
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

}
