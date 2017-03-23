import { Component } from '@angular/core';
import { App, ViewController, NavParams } from 'ionic-angular';

import { ImagePath } from '../../providers/image-path';

import { TownDetails } from '../../models/town-details';

import { TabsPage } from '../tabs/tabs';
/*
  Generated class for the TownSplash page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-town-splash',
  templateUrl: 'town-splash.html'
})
export class TownSplashPage {

	townDetails: TownDetails;

	constructor(public viewCtrl: ViewController, public appCtrl: App, public navParams: NavParams, private imagePath:ImagePath) {
		this.townDetails = navParams.get("townDetails");
		
	}

	imageLoaded() {
	  	setTimeout (() => {
	    	this.goToDetails();
	    }, 4000)
	}

	errorLoading ($event) {
		this.goToDetails();
	}

	goToDetails() {
		let options = { animate: false };
		this.viewCtrl.dismiss();
		this.appCtrl.getRootNav().push(TabsPage, {townDetails: this.townDetails}, options);
	}

}
