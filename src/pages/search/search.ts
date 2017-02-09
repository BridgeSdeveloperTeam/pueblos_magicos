import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { GoogleAnalytics } from 'ionic-native';

import { TownOverview } from '../../models/townOverview';
import { TownDetails } from '../../models/town-details';

import { TownInfo } from '../../providers/town-info';
import { ImagePath } from '../../providers/image-path';

import { TabsPage } from '../tabs/tabs';

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
	searchInput: string;
	loading:any;

	constructor(public navCtrl: NavController, public navParams: NavParams, private townInfo:TownInfo, private imagePath:ImagePath, private alertCtrl: AlertController, public loadingCtrl: LoadingController) {
		this.searchInput = "";
	}

	ionViewDidEnter () {
		GoogleAnalytics.trackView("Busqueda");
	}

	performSearch($event) {
		if(this.searchInput.length >2) {

			this.townInfo.searchForTown(this.searchInput).subscribe(
				response => {
					let townListInfo = this.handleResponse(response);
					this.townList = townListInfo;
				}
			);
		}
		
	}

	private handleResponse(response:any) : TownOverview {
		let jsonResponse = response.json();
		if(response.status == 200) {
			return <TownOverview>jsonResponse;
		}else {
			return null;
		}
	}

	townSelected(town) {
		GoogleAnalytics.trackEvent("Pueblos", "Tap", town.nombre);
		this.presentLoadingController();
		this.townInfo.loadTownDetails(town.id).subscribe(
			(response) => {
				this.dismissLoadingController();
				let townDetails = this.handleDetailsResponse(response);
				if(townDetails.nombre != undefined) {
					this.navCtrl.push(TabsPage, {townDetails});
				}else {
					let alert = this.alertCtrl.create({
						title: 'Lo sentimos',
						subTitle: 'Ocurrio un error al consultar la información',
						buttons: ['OK']
					});
					alert.present();
				}
			},
			(error) => {
				this.dismissLoadingController();
			}
		);
	}

	private presentLoadingController() {
		this.loading = this.loadingCtrl.create({
			content:''
		});
		this.loading.present();
	}

	private dismissLoadingController() {
		this.loading.dismiss();
	};

	private handleDetailsResponse(response:any) : TownDetails {
		let jsonResponse = response.json();
		if(response.status == 200) {
			return <TownDetails>jsonResponse;
		}else {
			return null;
		}
	}

}
