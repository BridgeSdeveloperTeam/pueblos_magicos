import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the GoogleDirections provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GoogleDirections {

	googleDirectionsUrl = "https://maps.googleapis.com/maps/api/directions/json?";

	constructor(public http: Http) {
		
	}

	getDirections(originLat: string, originLng: string, destLat:string, destLng: string) {
		let parameters = "origin=" + originLat + ","+originLng+"&destination="+destLat+ "," + destLng;
		return this.http.get( this.googleDirectionsUrl + parameters + "&key=AIzaSyBO62nL61dTevJ-SESMgueoycTejhQIBLs")
	  		.map(res => res);
	}

}
