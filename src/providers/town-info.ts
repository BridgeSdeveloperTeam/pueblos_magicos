import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { RestBase } from './rest-base';

/*
  Generated class for the TownInfo provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TownInfo extends RestBase{

	servicePath : string;

	constructor(public http: Http) {
		super();
		this.servicePath = '/fakeTownData.json';
	}

	loadTownDetails(townId:string): Observable<any> {
		return this.http.get(this.apiUrl + this.servicePath)
	  		.map(res => res);
	}


}
