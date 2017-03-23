import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ColoredSection } from '../../models/colored-section';
import { Company } from '../../models/company';

import { SectionAppearance } from '../../providers/section-appearance';
import { ImagePath } from '../../providers/image-path';
/*
  Generated class for the Companies page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-companies',
  templateUrl: 'companies.html'
})
export class CompaniesPage extends ColoredSection {

	companies: Company[];
	dividerColor: string;

 	constructor(public navCtrl: NavController, public navParams: NavParams, protected sectionAppearance: SectionAppearance, private imagePath:ImagePath) {
 		super(navCtrl,navParams,sectionAppearance);
 		this.companies = <Company[]>navParams.data.companies;
 		this.dividerColor = sectionAppearance.getCurrentHexColor();
 	}

 	ionViewWillEnter() {
		let elements = document.getElementsByClassName('item-inner');
		for(var i=0;i<elements.length;i++) {
			let element = <HTMLElement>elements[i];
			element.style.borderBottomColor = this.dividerColor;
		}
	}

}
