import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LandingPage } from '../landing/landing';
import { TownTemplatePage } from '../town-template/town-template';

import { SectionAppearance } from '../../providers/section-appearance';
import { Favorites } from '../../providers/favorites';

import { ColoredSection } from '../../models/colored-section';
import { TownDetails } from '../../models/town-details';

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

  townDetails: TownDetails;
  whatToDo: Array<Object>;
  history: Array<Object>;
  festivities: Array<Object>;
  featured: Array<Object>;


  constructor(public navCtrl: NavController, public navParams: NavParams, protected sectionAppearance: SectionAppearance, private favorites: Favorites)  {
    super(navCtrl,navParams,sectionAppearance);
    this.townDetails = <TownDetails>navParams.get("townDetails");
    this.whatToDo = this.townDetails.queHacer;
    this.history = this.townDetails.historia;
    this.festivities = this.townDetails.festividades;
    this.featured = this.townDetails.recomendado;

  }

  public favoriteButtonTapped(add) {
    if(add) {
      this.favorites.setFavorite(this.townDetails);
    }else {
      this.favorites.removeFavorite(this.townDetails);
    }
    
  } 

  goBack() {
    this.navCtrl.pop();
  }

}