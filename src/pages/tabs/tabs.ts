import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LandingPage } from '../landing/landing';
import { TownTemplatePage } from '../town-template/town-template';

import { SectionAppearance } from '../../providers/section-appearance';
import { Favorites } from '../../providers/favorites';
import { RestUser } from '../../providers/rest-user';

import { ColoredSection } from '../../models/colored-section';
import { TownDetails } from '../../models/town-details';
import { User } from '../../models/user';

import { GoogleAnalytics } from 'ionic-native';


/*
  Generated class for the Tabs tabs.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage extends ColoredSection {

  tab1Root: any = LandingPage;
  tab2Root: any = TownTemplatePage;
  tab3Root: any = TownTemplatePage;
  tab4Root: any = TownTemplatePage;
  tab5Root: any = TownTemplatePage;
  user: User;

  townDetails: TownDetails;
  whatToDo: Array<Object>;
  history: Array<Object>;
  festivities: Array<Object>;
  featured: Array<Object>;


  constructor(public navCtrl: NavController, public navParams: NavParams, protected sectionAppearance: SectionAppearance, private favorites: Favorites, private restUser:RestUser)  {
    super(navCtrl,navParams,sectionAppearance);
    
    this.townDetails = <TownDetails>navParams.get("townDetails");
    this.whatToDo = this.townDetails.queHacer;
    this.history = this.townDetails.historia;
    this.festivities = this.townDetails.festividades;
    this.featured = this.townDetails.recomendado;
    this.user = this.restUser.getUser();

  }

  public favoriteButtonTapped(add) {
    if(add) {
      this.favorites.setFavorite(this.townDetails, this.user.id).subscribe(response=>{});
      GoogleAnalytics.trackEvent("Favoritos", "Tap", this.townDetails.nombre);
    }else {
      GoogleAnalytics.trackEvent("Remover Favoritos", "Tap", this.townDetails.nombre);
      this.favorites.removeFavorite(this.townDetails, this.user.id).subscribe(response=>{});
    }
    
  } 

  goBack() {
    this.navCtrl.pop();
  }

}