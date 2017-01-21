
import { NavController, NavParams } from 'ionic-angular';
import { SectionAppearance } from '../providers/section-appearance';

export class ColoredSection {
	
	sectionColor: string;
	sectionImage: string;
	title: string;
	hexColor: string;

	constructor (public navCtrl: NavController, public navParams: NavParams, protected sectionAppearance: SectionAppearance) {
		this.sectionColor = sectionAppearance.getCurrentColor();
		this.sectionImage = sectionAppearance.getCurrentImage();
		this.title = sectionAppearance.getCurrentTitle();
		this.hexColor = sectionAppearance.getCurrentHexColor();
	}
}