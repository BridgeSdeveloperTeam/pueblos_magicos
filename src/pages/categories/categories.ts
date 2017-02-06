import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { State } from '../../models/state';

import { StateList } from '../../providers/state-list';
import { SectionAppearance } from '../../providers/section-appearance';

import { StateListPage } from '../state-list/state-list';
import { SearchPage } from '../search/search';

/*
  Generated class for the Categories page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html'
})
export class CategoriesPage {

	title: string;
	segmentModel: string;
	showingActivities: boolean;
	loading: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, private stateList: StateList, private sectionAppearance: SectionAppearance, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {

		if(this.navParams.get("regiones") === true) {
			this.segmentModel = "regiones";
			this.title = "Regiones";
			this.showingActivities = false;
		}else {
			this.segmentModel = "actividades";
			this.title = "Actividades";
			this.showingActivities = true;
			
		}

	}

	changeActivities() {
		if(this.segmentModel == "actividades") {
			this.title = "Actividades";
			this.showingActivities = true;
		}else {
			this.title = "Regiones";
			this.showingActivities = false;
		}
		
	}

	activitySelected(number: string) {
		this.loading = this.loadingCtrl.create({
			content:''
		});
		this.loading.present();
		this.stateList.loadStatesByActivity(number).subscribe(
		response => {
			
			this.sectionAppearance.setAppearanceForActivity(number);
	      	let states = this.handleResponse(response);	
	      	this.showStates(states);
	    },
	    err => {
	    	this.handleError();
	    });
	}

	regionSelected(number: string) {
		this.loading = this.loadingCtrl.create({
			content:''
		});
		this.loading.present();
		this.stateList.loadStatesByRegion(number).subscribe(response => {
			
			this.sectionAppearance.setAppearanceForRegion(number);
			let states = this.handleResponse(response);
	      	this.showStates(states);
	      	
	    },
	    err => {
	    	this.handleError();
	    });
	}

	searchButtonTapped () {
		this.navCtrl.push(SearchPage);
	}


	//private
	private handleResponse(response:any) : State[] {
		this.loading.dismiss().catch(() => {});
		let jsonResponse = response.json();
		console.log(jsonResponse);
		if(response.status == 200) {
			var filteredResults = [];
			for(let i=0;i<jsonResponse.length;i++) {
				let state = jsonResponse[i];
				if(state.pueblos && state.pueblos.length > 0) {
					filteredResults.push(state);
				}
			}
			return <State[]>filteredResults;
		}else {
			return null;
		}
	}

	private showStates(states: State[]) {
		if(states != null) {
			this.navCtrl.push(StateListPage, {states});
		}else {
			this.handleError();
		}
	}

	private handleError() {
		this.loading.dismiss().catch(() => {});
		let alert = this.alertCtrl.create({
			title: 'Lo sentimos',
			subTitle: 'Ocurrio un error al consultar la información',
			buttons: ['OK']
		});
		alert.present();
	}

}
