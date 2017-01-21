import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

	constructor(public navCtrl: NavController, public navParams: NavParams, private stateList: StateList, private sectionAppearance: SectionAppearance) {

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
		this.stateList.loadStatesByActivity(number).subscribe(response => {
			this.sectionAppearance.setAppearanceForActivity(number);
	      	let states = this.handleResponse(response);	
	      	this.showStates(states);
	    });
	}

	regionSelected(number: string) {
		this.stateList.loadStatesByRegion(number).subscribe(response => {
			this.sectionAppearance.setAppearanceForRegion(number);
			let states = this.handleResponse(response);
	      	this.showStates(states);
	      	
	    });
	}

	searchButtonTapped () {
		this.navCtrl.push(SearchPage);
	}


	//private
	private handleResponse(response:any) : State[] {
		let jsonResponse = response.json();
		if(jsonResponse.status == 200) {
			return <State[]>jsonResponse.data;
		}else {
			return null;
		}
	}

	private showStates(states: State[]) {
		if(states != null) {
			this.navCtrl.push(StateListPage, {states});
		}
	}

}
