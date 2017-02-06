import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TownOverview } from '../../models/townOverview';
import { TownDetails } from '../../models/town-details';
import { ColoredSection } from '../../models/colored-section';

import { SectionAppearance } from '../../providers/section-appearance';
import { TownInfo } from '../../providers/town-info';

import { TabsPage } from '../tabs/tabs';

/*
  Generated class for the TownList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-town-list',
  templateUrl: 'town-list.html'
})
export class TownListPage extends ColoredSection {

	townList: TownOverview[];
	baseUrl: string;

	constructor(public navCtrl: NavController, public navParams: NavParams, protected sectionAppearance: SectionAppearance, private townInfo: TownInfo) {
		super(navCtrl,navParams, sectionAppearance);
		this.townList = navParams.get("townList");
		this.baseUrl = "https://admin.pueblosmagicosapp.com/public/";
	}

	ionViewWillEnter() {
		let elements = document.getElementsByClassName('item-inner');
		for(var i=0;i<elements.length;i++) {
			let element = <HTMLElement>elements[i];
			element.style.borderBottomColor = this.hexColor;
		}
	}

	townSelected(town) {
		this.townInfo.loadTownDetails(town.id).subscribe(response => {
			let townDetails = this.handleResponse(response);
			this.navCtrl.push(TabsPage, {townDetails}, {"animate": false});
		});
	}


	private handleResponse(response:any) : TownDetails {
		let jsonResponse = response.json();
		if(jsonResponse.status == 200) {
			return <TownDetails>jsonResponse.data;
		}else {
			return null;
		}
	}

	getPhotoUrl(photoPath) {
		return this.baseUrl + photoPath;
	}


}
