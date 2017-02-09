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

	private loadMap() {
		// create a new map by passing HTMLElement
		let element: HTMLElement = document.getElementById('map');
		
		let latitude = parseFloat(this.townDetails.latitud);
		let longitude = parseFloat(this.townDetails.longitud);
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
		
		console.log(latLng);

		

		
	}

}
