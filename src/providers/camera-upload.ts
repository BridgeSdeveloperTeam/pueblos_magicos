import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Events, LoadingController } from 'ionic-angular';
import { Camera, Crop, Transfer} from 'ionic-native';

import { RestUser } from './rest-user';

/*
  Generated class for the CameraUpload provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CameraUpload {

	loading: any;

  	constructor(public http: Http, private events:Events, private loadingCtrl:LoadingController, private restUser: RestUser) {}

  	selectPictureAndUpload() {
	  	var options = {
	        destinationType: Camera.DestinationType.FILE_URI,
	        // In this app, dynamically set the picture source, Camera or photo gallery
	        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
	        encodingType: Camera.EncodingType.JPEG,
	        mediaType: Camera.MediaType.PICTURE,
	        allowEdit: false,
	        correctOrientation: true  //Corrects Android orientation quirks
	    };

	    this.loading = this.loadingCtrl.create({
			content:''
		});
		this.loading.present();

	    Camera.getPicture(options).then((imageData) => {

	      Crop.crop( imageData ,{quality: 50}).then((newImage) => {
	          let registeredUser = this.restUser.getUser();

	          var options = {
	            fileKey: "file",
	            fileName: "photo"+ registeredUser.id +".jpg",
	            chunkedMode: false,
	            mimeType: "multipart/form-data",
	            params : {'id': registeredUser.id}
	          };
	          
	          let fileTransfer = new Transfer();

	          fileTransfer.upload(newImage, "http://admin.pueblosmagicosapp.com/app/usuario/cargar_imagen", options).then(data => {
	            this.restUser.savePhotoUrl(data["response"]);
	            this.events.publish('user:pictureChanged', newImage);
	            this.loading.dismiss().catch(() => {});
	          }, err => {
	            console.log(err);
	            this.loading.dismiss().catch(() => {});
	          });

	        }, (error) => {
	          console.error("Error cropping image", error);
	          this.loading.dismiss().catch(() => {});
	      });
	     
	    }, (err) => {
	    	// Handle error
	    	console.log(err);
	    	this.loading.dismiss().catch(() => {});
	    });
  	}

}
