import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

import { SectionAppearance } from '../../providers/section-appearance';
import { GoogleDirections } from '../../providers/google-directions';

import { TownDetails } from '../../models/town-details';
import { ColoredSection } from '../../models/colored-section';

import { Geolocation } from 'ionic-native';


import {
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapsLatLng,
 GoogleMapsLatLngBounds,
 GoogleMapsMarkerOptions,
 GoogleMapsMarker,
 GoogleMapsPolyline,
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
	destinationMarker:GoogleMapsMarker;
	originMarker: GoogleMapsMarker;
	townDetails: TownDetails;
	routePolyline: GoogleMapsPolyline;

	constructor(public navCtrl: NavController, public navParams: NavParams, protected sectionAppearance: SectionAppearance, private platform: Platform, private googleDirections: GoogleDirections) {
		super(navCtrl,navParams,sectionAppearance);
		this.townDetails = <TownDetails>navParams.get("townDetails");
			
	}

	ionViewDidEnter () {
		GoogleAnalytics.trackView("Mapa");
		if(this.platform.is("cordova")) {
			this.loadMap();
			this.traceRoute();
		}
	}

	ionViewWillLeave () {
		this.destinationMarker.remove();
		this.routePolyline.remove();
		this.map.clear();

	}

	private loadMap() {
		// create a new map by passing HTMLElement
		
		
		var latitude = parseFloat(this.townDetails.latitud);
		var longitude = parseFloat(this.townDetails.longitud);
		var zoom = 15;
		// create LatLng object	
		var positionIsValid = true;
		if(isNaN(latitude) || isNaN(longitude)) {
			latitude = 24.007678;
			longitude = -102.523666;
			zoom = 4;
			positionIsValid = false;
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
            if(positionIsValid) {
            	let markerOptions: GoogleMapsMarkerOptions = {
					position: latLng
				};
				this.map.addMarker(markerOptions).then((newMarker: GoogleMapsMarker) => {
			      this.destinationMarker = newMarker;
			    });
            }
			
    	});	

		
	}

	private traceRoute() {
		Geolocation.getCurrentPosition({}).then((resp) => {
		 // resp.coords.latitude
		 // resp.coords.longitude
		let latLng: GoogleMapsLatLng = new GoogleMapsLatLng(resp.coords.latitude, resp.coords.longitude);

        // create new marker
		let markerOptions: GoogleMapsMarkerOptions = {
			position: latLng
		};

		this.map.addMarker(markerOptions).then((newMarker: GoogleMapsMarker) => {
			this.originMarker = newMarker;
			let bounds = new GoogleMapsLatLngBounds([latLng, new GoogleMapsLatLng(parseFloat(this.townDetails.latitud), parseFloat(this.townDetails.longitud))]);
			
			this.map.animateCamera({
				'target' : bounds
			});

			this.googleDirections.getDirections(""+resp.coords.latitude, ""+resp.coords.longitude, this.townDetails.latitud, this.townDetails.longitud)
			.subscribe(
				(directions) => {
					
					if(directions.json().status === "OK") {
						//start point
						
						let steps = directions.json().routes[0].legs[0].steps;
						var points = [latLng];
						

						for(var i=0;i<steps.length;i++) {
							let endLocation = steps[i].end_location;
							
							let point = new GoogleMapsLatLng(endLocation.lat, endLocation.lng);
							points.push(point);
						}
						
						this.map.addPolyline({
							'points' : points,
					        'color' : 'darkblue',
					        'width': 5,
						}).then((newPolyline: GoogleMapsPolyline) => {
								this.routePolyline = newPolyline;
							},	
						 	(polylineError) => {
								console.log(polylineError);
							}
						);

					}
				},	
			 	(error) => {
					console.log(error);
				}
			);


	    });

		}).catch((error) => {
		  console.log('Error getting location', error);
		});
	}

}
