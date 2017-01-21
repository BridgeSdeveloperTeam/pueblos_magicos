import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

import { TownDetails } from '../models/town-details';
/*
  Generated class for the Favorites provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Favorites {

	private favorites: Array<TownDetails>;
	private storage;
	
	constructor(public http: Http) {
  		this.storage = new Storage();
		this.storage.get("favorites").then((val) => {
			if(val == null) {
				this.favorites = [];
			}else{
				this.favorites = val;
			}
	       	
	     });
	}

	setFavorite(town: TownDetails) {
		this.favorites.push(town);
		this.saveFavoritesToStorage();
	}

	removeFavorite(town: TownDetails) {
		let index = this.iterateAndReturnIndex(town);
		if(index>=0) {
			this.favorites.splice(index, 1);
			this.saveFavoritesToStorage();
		}
	}

	getFavorites() : Array<TownDetails> {
		return this.favorites;
	}

	isFavorite(town: TownDetails)  {
		let index = this.iterateAndReturnIndex(town);
		if(index>=0) {
			return true;
		}else {
			return false;
		}
  	}

  	clearStorage() {
  		this.storage.clear().then((val) => {
			this.favorites = [];
	    });
  	}

  	private iterateAndReturnIndex(town: TownDetails) {
  		var index = -1;
		for(var i=0;i<this.favorites.length;i++) {
			let favorite = <TownDetails>this.favorites[i];
			if(favorite.id == town.id) {
				index = i;
				break;
			}
		}
		return index;
  	}

  	private saveFavoritesToStorage() {
  		this.storage.set("favorites", this.favorites);
  	}

}