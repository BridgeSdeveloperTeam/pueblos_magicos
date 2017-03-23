import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, Events } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { GlobalValidator } from '../../models/global-validator';

import { GoogleAnalytics } from 'ionic-native';

import { User } from '../../models/user';
import { RestUser } from '../../providers/rest-user';
import { StateList } from '../../providers/state-list';
import { CameraUpload } from '../../providers/camera-upload';
import { ImagePath } from '../../providers/image-path';

/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

	user:User;
  userForm:FormGroup;
	stateArray: Array<any>;
  loading:any;
  profilePicture:string;

	constructor(public navCtrl: NavController, public navParams: NavParams, private restUser: RestUser, private stateList: StateList, private formBuilder: FormBuilder, private alertCtrl:AlertController, private loadingCtrl:LoadingController, private events: Events, private cameraUpload:CameraUpload, private zone: NgZone, private imagePath:ImagePath) {
		this.stateList.getStateNames().subscribe(res => {
			this.stateArray = <any[]>res.json().estados;
		});

		this.user = this.restUser.getUser();
    this.profilePicture = this.user.foto_perfil;

    this.userForm = this.formBuilder.group({
      nombre: [this.user.nombre, Validators.required],
      apellido: [this.user.apellido, Validators.required],         
      correo: [this.user.correo, Validators.compose([Validators.required, GlobalValidator.mailFormat])],
      estado_id: [this.user.estado_id, Validators.required],
      edad: [this.user.edad, Validators.required],
      genero_id: [this.user.genero_id, Validators.required]
    });


    this.events.subscribe('user:pictureChanged', photoUrl => {
      //Photo didn't update without this
      this.zone.run(() => {
        this.profilePicture = photoUrl;
      });
      this.user = this.restUser.getUser();
    });
	}	

	ionViewDidEnter () {
		GoogleAnalytics.trackView("Perfil");
	}

  avatarClicked() {
     this.cameraUpload.selectPictureAndUpload();
  }

  submitForm() {
    if(this.userForm.valid) {
      this.presentLoading();
      this.userForm.value.id = this.user.id;
      this.restUser.updateUser(<User>this.userForm.value).subscribe(
      (response)=> {
        this.dismissLoading();
        //response.json() will be the id if new user
        //response.json() will be 0 if email is already registered
        let userId = response.json();
        if(userId == 0) {
          this.presentAlert("Error", "El correo electrónico ya se encuentra registrado.");
        }else {

          var newUser = this.userForm.value;
          if(this.user.foto_perfil !== null) {
            newUser.foto_perfil = this.user.foto_perfil;
          }
          
          this.restUser.saveUserToStorage(<User>newUser);
          this.presentAlert("Aviso", "Información actualizada correctamente.");

        }
        
      }, (error) => {
        console.log(error);
        this.presentAlert("Error", "Favor de intentarlo mas tarde.");
      }); 
      
    }else {
      this.dismissLoading();
      this.presentAlert("Advertencia", "Favor de llenar todos los campos correctamente.");
    }
  }

  getPhotoUrl(){
    if(this.profilePicture && this.profilePicture.length>0) {
      //Server
      if(this.profilePicture.indexOf("img")>=0) {
        return this.imagePath.getFullPath(this.profilePicture);
      }else {
        return this.profilePicture;
      }
     
    }else {
      //Default
      return './assets/img/photo_placeholder.png';
    }
  }

  private presentLoading() {
    this.loading = this.loadingCtrl.create({
      content:''
    });
    this.loading.present();
  }

  private dismissLoading() {
    this.loading.dismiss().catch(() => {});
  }

  private presentAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

}
