import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ColoredSection } from '../../models/colored-section';

import { SectionAppearance } from '../../providers/section-appearance';

/*
  Generated class for the Gallery page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html'
})
export class GalleryPage extends ColoredSection {

	images: Array<string>;

	constructor(public navCtrl: NavController, public navParams: NavParams, protected sectionAppearance: SectionAppearance) {
		super(navCtrl,navParams,sectionAppearance);
		this.images = this.navParams.get("images");
	}


}
