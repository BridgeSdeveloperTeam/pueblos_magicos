import { Component } from '@angular/core';
import { NavController, NavParams, AlertController} from 'ionic-angular';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { CategoriesPage } from '../categories/categories';
import { RegisterPage } from '../register/register';

import { Facebook, GooglePlus, GoogleAnalytics } from 'ionic-native';

import { RestUser } from '../../providers/rest-user';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private restUser:RestUser, private formBuilder: FormBuilder) {
    this.loginFormGroup =  this.formBuilder.group({      
        correo: ['', Validators.compose([Validators.required, GlobalValidator.mailFormat])],
        password: ['', Validators.required]
    });
  }

  submitForm() {
    if(this.loginFormGroup.valid) {
      this.restUser.loginUser(this.loginFormGroup.value.correo, this.loginFormGroup.value.password)
      .subscribe(
        (response)=> {
          console.log(response.json());
          if(response.json() == 0) {
            this.presentAlert("Error", "Usuario o contraseña incorrectos.");
          }else {
            this.restUser.saveUserToStorage(<User>response.json());
            this.navCtrl.setRoot(CategoriesPage);
          }
          
        },
        (error) => {
          console.log(error);
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
            console.log(data);
          }
        }
      ]
    });
    prompt.present();
  }

  facebookButtonTapped() {
    GoogleAnalytics.trackEvent("Social", "Tap", "Facebook");
    Facebook.login(["public_profile","email"]).then((response) => {
      console.log(response);
      Facebook.api("me/?fields=id,email,first_name,last_name",
                  ['public_profile', 'email'])
        .then((graphResponse) => {
          console.log(graphResponse);
          this.navCtrl.setRoot(CategoriesPage);
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
      console.log(res);
      //accessToken: ""
      //displayName: ""
      //email: ""
      //idToken: ""
      //imageUrl: ""
      //refreshToken: ""
      //serverAuthCode: ""
      //userId: ""
    })
    .catch(err => console.error(err));
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
