import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ColoredSection } from '../../models/colored-section';
import { TownDetails } from '../../models/town-details';

import { SectionAppearance } from '../../providers/section-appearance';
import { Favorites } from '../../providers/favorites';
import { ImagePath } from '../../providers/image-path';

import { GalleryPage } from '../gallery/gallery';
import { MapPage } from '../map/map';

import { GoogleAnalytics } from 'ionic-native';

/*
  Generated class for the Landing page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html'
})
export class LandingPage extends ColoredSection {

	townDetails: TownDetails;
	activeFav: string;
	isFav: boolean;
	dividerColor: string;
	showGallery: boolean;

	constructor(public navCtrl: NavController, public navParams: NavParams, protected sectionAppearance: SectionAppearance, private favorites: Favorites, private imagePath: ImagePath) {
		super(navCtrl,navParams,sectionAppearance);
		this.townDetails = <TownDetails>navParams.data;
		this.activeFav = sectionAppearance.getCurrentFavIcon();
		this.dividerColor = sectionAppearance.getCurrentHexColor();

	}

	ionViewWillEnter () {
		this.isFav = this.favorites.isFavorite(this.townDetails);
		this.showGallery = (this.townDetails.galería && this.townDetails.galería.length>0 ) ? true : false;
	}
	// Load map only after view is initialize
	//ngAfterViewInit() {
	ionViewDidEnter () {
		GoogleAnalytics.trackView("Detalle pueblo/Mapa");
	}


	favTapped() {
		this.isFav = !this.isFav;
		this.navCtrl.parent.viewCtrl.instance.favoriteButtonTapped(this.isFav);
	}

	galleryTapped() {
		this.navCtrl.push(GalleryPage, {"images": this.townDetails.galería});
	}

	backButtonTapped() {
		this.navCtrl.parent.viewCtrl.instance.goBack();
	}

	mapTapped() {
		this.navCtrl.push(MapPage, {"townDetails":this.townDetails}, {"animate":false});
	}

}
