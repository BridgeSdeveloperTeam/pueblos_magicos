import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

import { SectionAppearance } from '../../providers/section-appearance';

import { TownDetails } from '../../models/town-details';
import { ColoredSection } from '../../models/colored-section';

import {
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapsLatLng,
 GoogleMapsMarkerOptions,
 GoogleMapsMarker,
 GoogleAnalytics
} from 'ionic-native';

/*
  Generated class for the Map page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage extends ColoredSection {

	map: GoogleMap;
	marker:GoogleMapsMarker;
	townDetails: TownDetails;

	constructor(public navCtrl: NavController, public navParams: NavParams, protected sectionAppearance: SectionAppearance, private platform: Platform) {
		super(navCtrl,navParams,sectionAppearance);
		this.townDetails = <TownDetails>navParams.get("townDetails");
			
	}


	ionViewDidEnter () {
		GoogleAnalytics.trackView("Mapa");
		if(this.platform.is("cordova")) {
			this.loadMap();
		}
	}

	ionViewWillLeave () {
		this.marker.remove();
		this.map.clear();
	}

	private loadMap() {
		// create a new map by passing HTMLElement
		
		
		var latitude = parseFloat(this.townDetails.latitud);
		var longitude = parseFloat(this.townDetails.longitud);
		var zoom = 15;
		// create LatLng object	
		if(isNaN(latitude) || isNaN(longitude)) {
			latitude = 24.007678;
			longitude = -102.523666;
			zoom = 4;
		}

		let latLng: GoogleMapsLatLng = new GoogleMapsLatLng(latitude,longitude);
		
		let element: HTMLElement = document.getElementById('map');
		this.map = new GoogleMap(element);

		this.map.moveCamera({
		  'target': latLng,
		  'zoom': zoom,
		});	

        this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
            // create new marker
			let markerOptions: GoogleMapsMarkerOptions = {
				position: latLng
			};
			this.map.addMarker(markerOptions).then((newMarker: GoogleMapsMarker) => {
		      this.marker = newMarker;
		    });
    	});	

		
	}

}
