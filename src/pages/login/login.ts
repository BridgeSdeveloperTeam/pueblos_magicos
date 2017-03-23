import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Events, LoadingController } from 'ionic-angular';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { CategoriesPage } from '../categories/categories';
import { RegisterPage } from '../register/register';

import { Facebook, GooglePlus, GoogleAnalytics } from 'ionic-native';

import { RestUser } from '../../providers/rest-user';
import { Favorites } from '../../providers/favorites';

import { GlobalValidator } from '../../models/global-validator';
import { User } from '../../models/User';
/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loginFormGroup: FormGroup;
  loading:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private restUser:RestUser, private formBuilder: FormBuilder, public events: Events, public favorites: Favorites, private loadingCtrl:LoadingController) {
    this.loginFormGroup =  this.formBuilder.group({      
        correo: ['', Validators.compose([Validators.required, GlobalValidator.mailFormat])],
        password: ['', Validators.required]
    });
  }

  submitForm() {
    if(this.loginFormGroup.valid) {
      this.presentLoading();
      this.restUser.loginUser(this.loginFormGroup.value.correo, this.loginFormGroup.value.password).subscribe(
        (response)=> {
          this.dismissLoading();
          if(response.json() == 0) {
            this.presentAlert("Error", "Usuario o contraseña incorrectos.");
          }else {

            let user = <User>response.json();
            this.restUser.saveUserToStorage(user);
            this.fetchFavorites(user);
            this.events.publish('user:loggedIn', user);
            this.navCtrl.setRoot(CategoriesPage);
          }
          
        },
        (error) => {
          console.log(error);
          this.dismissLoading();
          this.presentAlert("Error", "Favor de intentarlo más tarde.");
        }
      );
    }else {
      this.presentAlert("Advertencia", "Favor de llenar los campos correctamente.");
    }
    
  }

  registerButtonTapped() {
    this.navCtrl.push(RegisterPage);
  }

  forgotPasswordTapped() {
    let prompt = this.alertCtrl.create({
      title: 'Recuperar password',
      message: "Ingresa el correo electrónico de registro.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email'
        },
      ],
      buttons: [
        {
          text: 'Enviar',
          handler: data => {
            //Retrieve password logic here
            
            this.restUser.forgotPassword(data.email).subscribe(
            response=> {
              
              if(response.json().success === true) {
                this.presentAlert("Aviso", "En breve recibirás un correo electrónico con tu nueva contraseña.");
              }else {
                this.presentAlert("Error", "Correo inexistente.");
              }
            }, error => {
              console.log(error);
            });
          }
        }
      ]
    });
    prompt.present();
  }

  facebookButtonTapped() {
    GoogleAnalytics.trackEvent("Social", "Tap", "Facebook");
    Facebook.login(["public_profile","email"]).then((response) => {
      Facebook.api("me/?fields=id,email,first_name,last_name",
                  ['public_profile', 'email'])
        .then((graphResponse) => {
         
          let firstName = (graphResponse.first_name) ? graphResponse.first_name : null;
          let lastName = (graphResponse.last_name) ? graphResponse.last_name : null;
          let email = (graphResponse.email) ? graphResponse.email : null;
         
          this.presentLoading();
          this.restUser.registerUserSocial(firstName, lastName, email).subscribe(
            (res)=> {
    
              this.dismissLoading();
           
              let user = <User>res.json();
              this.processSocialResponse(user);
              //some fields may be null
            },
            (error) => {
              this.dismissLoading();
              this.presentAlert("Error", "Favor de intentarlo más tarde.");
            }
          );
          //graphResponse.email
        }).catch((graphError) => {
          console.log(graphError);
        });
    }).catch((_error) => {
      console.log(_error);
    });
  }

  googleButtonTapped() {
    GoogleAnalytics.trackEvent("Social", "Tap", "Google");
    GooglePlus.login({})
    .then((res) => {
      this.navCtrl.setRoot(CategoriesPage);
      let nameArray = res.displayName.split(" ");
      var firstName;
      var lastName;
      if(nameArray.length>1) {
        firstName = nameArray[0];
        lastName = nameArray[1];
      }else {
        firstName = res.displayName;
        lastName = null;
      }
      
      let email = (res.email) ? res.email : null;
     
      this.presentLoading();
      this.restUser.registerUserSocial(firstName, lastName, email).subscribe(
        (response)=> {
          this.dismissLoading();
       
          let user = <User>response.json();
          this.processSocialResponse(user);
          //some fields may be null
        },
        (error) => {
          this.dismissLoading();
          this.presentAlert("Error", "Favor de intentarlo más tarde.");
        }
      );
    })
    .catch(err => console.log(err));
  }

  processSocialResponse(user) {
    this.restUser.saveUserToStorage(user);
    this.fetchFavorites(user);
    this.events.publish('user:loggedIn', user);
    this.navCtrl.setRoot(CategoriesPage);
  }

  fetchFavorites(user) {
    this.favorites.getFavoritesRest(user.id);
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
