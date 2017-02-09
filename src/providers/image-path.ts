import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ImagePath provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ImagePath {

	baseUrl: string

	constructor(public http: Http) {
		this.baseUrl = "https://admin.pueblosmagicosapp.com/public/";
	}

	getFullPath(imagePath):string {
		return this.baseUrl + imagePath;
	}

}
