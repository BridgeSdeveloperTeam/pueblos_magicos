import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ColoredSection } from '../../models/colored-section';
import { TownDetails } from '../../models/town-details';

import { Platform } from 'ionic-angular';

import { SectionAppearance } from '../../providers/section-appearance';
import { Favorites } from '../../providers/favorites';

import { GalleryPage } from '../gallery/gallery';

import {
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapsLatLng,
 GoogleMapsMarkerOptions
} from 'ionic-native';

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
	map: GoogleMap;
	activeFav: string;
	isFav: boolean;
	dividerColor: string;

	constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform, protected sectionAppearance: SectionAppearance, private favorites: Favorites) {
		super(navCtrl,navParams,sectionAppearance);
		this.townDetails = <TownDetails>navParams.data;
		this.activeFav = sectionAppearance.getCurrentFavIcon();
		this.dividerColor = sectionAppearance.getCurrentHexColor();
		this.isFav = this.favorites.isFavorite(this.townDetails);

	}
	// Load map only after view is initialize
	//ngAfterViewInit() {
	ionViewDidEnter () {
		if(this.platform.is("cordova")) {
			this.loadMap();
		}
		
	}

	private loadMap() {
		// create a new map by passing HTMLElement
		let element: HTMLElement = document.getElementById('map');

		let latLngComponents = this.townDetails.ubicacion.split(',');
		let latitude = parseFloat(latLngComponents[0]);
		let longitude = parseFloat(latLngComponents[1]);
		// create LatLng object	
		let latLng: GoogleMapsLatLng = new GoogleMapsLatLng(latitude,longitude);

		this.map = new GoogleMap(element, {
			'camera': {
	            'latLng': latLng,
	            'zoom': 15
	        }
        });

		this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
            // create new marker
			let markerOptions: GoogleMapsMarkerOptions = {
				position: latLng
			};
			this.map.addMarker(markerOptions);
        });	
	}

	favTapped() {
		this.isFav = !this.isFav;
		this.navCtrl.parent.viewCtrl.instance.favoriteButtonTapped(this.isFav);
	}

	galleryTapped() {
		this.navCtrl.push(GalleryPage, {"images": this.townDetails.galeria});
	}

	backButtonTapped() {
		this.navCtrl.parent.viewCtrl.instance.goBack();
	}


}
