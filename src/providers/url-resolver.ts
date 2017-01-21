import { Injectable } from '@angular/core';

import { Platform } from 'ionic-angular';

/*
  Generated class for the UrlResolver provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UrlResolver {

	private prefix: string;

	constructor(private platform: Platform) {
		if(this.platform.is("ios")) {
			this.prefix = '../www/';
		}else if(this.platform.is("android")) {
			this.prefix = '../android_asset/www/';
		}else {
			this.prefix = '';
		}
	}

	prefixUrl() {
		return this.prefix;
	}

}
