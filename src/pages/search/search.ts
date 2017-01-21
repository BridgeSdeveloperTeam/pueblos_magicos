import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TownOverview } from '../../models/townOverview';

/*
  Generated class for the Search page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

	townList: TownOverview;

	constructor(public navCtrl: NavController, public navParams: NavParams) {}

}
