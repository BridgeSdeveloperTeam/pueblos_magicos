import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


import { SectionAppearance } from '../../providers/section-appearance';
import { Favorites } from '../../providers/favorites';
import { ImagePath } from '../../providers/image-path';

import { GoogleAnalytics } from 'ionic-native';

import { TownDetails } from '../../models/town-details';
import { ColoredSection } from '../../models/colored-section';

/*
  Generated class for the TownTemplate page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-town-template',
  templateUrl: 'town-template.html'
})
export class TownTemplatePage extends ColoredSection{

	sectionInfo: Array<Object>;
	activeFav: string;
	isFav: boolean;
	dividerColor: string;
	townDetails: TownDetails;
	tabName: string;

	constructor(public navCtrl: NavController, public navParams: NavParams, protected sectionAppearance: SectionAppearance, private favorites: Favorites, private imagePath:ImagePath) {
		super(navCtrl,navParams,sectionAppearance);
		
		this.sectionInfo = navParams.data.sectionInfo;
		this.townDetails = <TownDetails>navParams.data.townDetails;
		this.tabName = navParams.data.tabSection;
		this.activeFav = sectionAppearance.getCurrentFavIcon();
		this.dividerColor = sectionAppearance.getCurrentHexColor();
	}

	ionViewWillEnter() {
		this.isFav = this.favorites.isFavorite(this.townDetails);
		let elements = document.getElementsByClassName('item-inner');
		for(var i=0;i<elements.length;i++) {
			let element = <HTMLElement>elements[i];
			element.style.borderBottomColor = this.dividerColor;
		}
	}

	ionViewDidEnter () {
		GoogleAnalytics.trackView(this.tabName);
	}

	favTapped() {
		this.isFav = !this.isFav;
		this.navCtrl.parent.viewCtrl.instance.favoriteButtonTapped(this.isFav);
	}

	backButtonTapped() {
		this.navCtrl.parent.viewCtrl.instance.goBack();
	}


}
