import { Component, ViewChild } from '@angular/core';

import { NavController, NavParams, Content } from 'ionic-angular';

import { TownListPage } from '../town-list/town-list';

import { SectionAppearance } from '../../providers/section-appearance';

import { GoogleAnalytics } from 'ionic-native';

import { State } from '../../models/state';
import { TownOverview } from '../../models/townOverview';
import { ColoredSection } from '../../models/colored-section';
import { ImagePath } from '../../providers/image-path';


/*
  Generated class for the StateList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-state-list',
  templateUrl: 'state-list.html'
})
export class StateListPage extends ColoredSection {

  @ViewChild(Content) content: Content;
	states: State[];

	constructor(public navCtrl: NavController, public navParams: NavParams, protected sectionAppearance: SectionAppearance, private imagePath: ImagePath) {
		super(navCtrl, navParams, sectionAppearance);
		this.states = navParams.get("states");

  }

  ionViewWillEnter() {
    let elements = document.getElementsByClassName('item-inner');
    for(var i=0;i<elements.length;i++) {
      let element = <HTMLElement>elements[i];
      element.style.borderBottomColor = this.hexColor;
    }
  }

  ionViewDidEnter() {
    this.content.resize();
    GoogleAnalytics.trackView("Listado estados");
  }

  stateSelected(state:State) {
    GoogleAnalytics.trackEvent("Estados", "Tap", state.nombre);
  	let townList: TownOverview[] = <TownOverview[]>state.pueblos;
  	this.navCtrl.push(TownListPage, {townList});
	}

}
