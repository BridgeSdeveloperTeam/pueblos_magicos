import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, ModalController } from 'ionic-angular';

import { TownOverview } from '../../models/townOverview';
import { TownDetails } from '../../models/town-details';
import { ColoredSection } from '../../models/colored-section';

import { SectionAppearance } from '../../providers/section-appearance';
import { TownInfo } from '../../providers/town-info';
import { ImagePath } from '../../providers/image-path';

import { GoogleAnalytics } from 'ionic-native';

import { TownSplashPage } from '../town-splash/town-splash';
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
	loading:any;

	constructor(public navCtrl: NavController, public navParams: NavParams, protected sectionAppearance: SectionAppearance, private townInfo: TownInfo, private imagePath:ImagePath, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public modalCtrl: ModalController) {
		super(navCtrl,navParams, sectionAppearance);
		this.townList = navParams.get("townList");
	}

	ionViewDidEnter () {
		GoogleAnalytics.trackView("Listado Pueblos");
	}

	ionViewWillEnter() {
		let elements = document.getElementsByClassName('item-inner');
		for(var i=0;i<elements.length;i++) {
			let element = <HTMLElement>elements[i];
			element.style.borderBottomColor = this.hexColor;
		}
	}

	townSelected(town) {
		GoogleAnalytics.trackEvent("Pueblos", "Tap", town.nombre);
		this.presentLoadingController();

		this.townInfo.loadTownDetails(town.id).subscribe(
			(response) => {
				this.dismissLoadingController();
				let townDetails = this.handleResponse(response);
				if(townDetails.nombre != undefined) {
					if(townDetails.splashart !== null) {
						let splashModal = this.modalCtrl.create(TownSplashPage, { townDetails });
   						splashModal.present();
					}else {
						this.navCtrl.push(TabsPage, { townDetails });
					}
					
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
		this.loading.dismiss().catch(() => {});
	};

	private handleResponse(response:any) : TownDetails {
		let jsonResponse = response.json();
		if(response.status == 200 && jsonResponse.nombre) {
			return <TownDetails>jsonResponse;
		}else {
			return null;
		}
	}


}
