import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';

import { TownDetails } from '../models/town-details';
import { RestBase } from './rest-base';
/*
  Generated class for the Favorites provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Favorites extends RestBase {

	private favorites: Array<TownDetails>;
	private storage;
	
	constructor(public http: Http) {

		super();
  		this.storage = new Storage();
		this.storage.get("favorites").then((val) => {
			if(val == null) {
				this.favorites = [];
			}else{
				this.favorites = val;
			}
	       	
	     });
	}

	setFavorite(town: TownDetails, userId) : Observable<any>  {
		let servicePath = "/hacer_favorito";
		this.favorites.push(town);
		this.saveFavoritesToStorage();
		return this.http.get( this.apiUrl + servicePath + "/" + userId + "/" + town.id )
	  		.map(res => res);
	}

	removeFavorite(town: TownDetails, userId): Observable<any> {
		let index = this.iterateAndReturnIndex(town);
		if(index>=0) {
			this.favorites.splice(index, 1);
			this.saveFavoritesToStorage();
		}
		let servicePath = "/borrar_favorito";
		return this.http.get( this.apiUrl + servicePath + "/" + userId + "/" + town.id )
	  		.map(res => res);
	}

	getFavorites() : Array<TownDetails> {
		return this.favorites;
	}

	getFavoritesRest(userId) {
		let servicePath = "/get_favoritos";
		this.http.get( this.apiUrl + servicePath + "/" + userId ).map(res => res).subscribe(
			(res) => {
				this.favorites = res.json();
				this.saveFavoritesToStorage();
			},
			(err) => {
				console.log(err);
			}
		);
	
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