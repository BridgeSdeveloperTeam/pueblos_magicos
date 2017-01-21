import { Injectable } from '@angular/core';

/*
  Generated class for the SectionAppearance provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SectionAppearance {

	private color:string;
	private hexColor:string;
	private image:string;
	private title:string;
	private favIcon:string;

	constructor() {
		this.setAppearanceForActivity("1");
	}

	setAppearanceForActivity(section: string) {
		this.setColor(section);
		this.favIcon = "./assets/img/Fav/fav"+ section + ".png";
		this.image = "./assets/img/Categories/actividad"+section+"_detail.png";
		this.title = this.setTitleForActivity(section);

	}

	setAppearanceForRegion(section: string) {
		this.setColor(section);
		this.favIcon = "./assets/img/Fav/fav"+ section + ".png";
		this.image = "./assets/img/Categories/region"+section+"_detail.png";
		this.title = this.setTitleForRegion(section);
	}

	getCurrentColor() {
		return this.color;
	}

	getCurrentImage() {
		return this.image;
	}

	getCurrentTitle() {
		return this.title;
	}

	getCurrentFavIcon () {
		return this.favIcon;
	}

	getCurrentHexColor () {
		return this.hexColor;
	}

	private setColor(section:string) {
	
		switch(parseInt(section)) {
			case 1:
				this.color = "blue";
				this.hexColor = "#02caee"; 
				break;
			case 2:
				this.color = "pink";
				this.hexColor = "#f22598";
				break;
			case 3:
				this.color = "green";
				this.hexColor = "#82e806";
				break;
			case 4:
				this.color = "orange";
				this.hexColor = "#fd8d03";
				break;
			case 5:
				this.color = "yellow";
				this.hexColor = "#fbd318";
				break;
			default:
				this.color = "primary";
				this.hexColor = "#004a80"; 
				break;
		}
	}

	private setTitleForActivity(section:string) {
		let title = "";
		switch(parseInt(section)) {
			case 1:
				title = "Ecoturismo";
				break;
			case 2:
				title = "Act. Religiosas";
				break;
			case 3:
				title = "Sol y Playa";
				break;
			case 4:
				title = "Act. Culturales";
				break;
			case 5:
				title = "Aventura";
				break;
			default:
				title = "Ecoturismo";
				break;
		}
		return title;
	}

	private setTitleForRegion(section:string) {
		let title = "";
		switch(parseInt(section)) {
			case 1:
				title = "Región Pacífico";
				break;
			case 2:
				title = "Región Norte";
				break;
			case 3:
				title = "Región Golfo";
				break;
			case 4:
				title = "Región Sur";
				break;
			case 5:
				title = "Region Centro";
				break;
			default:
				title = "Región Pacífico";
				break;
		}
		return title;
	}

}
