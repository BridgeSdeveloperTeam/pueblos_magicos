import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar, Splashscreen, Camera, Crop } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import { CategoriesPage } from '../pages/categories/categories';
import { TownListPage } from '../pages/town-list/town-list';
import { ProfilePage } from '../pages/profile/profile';

import { SectionAppearance } from '../providers/section-appearance';
import { Favorites } from '../providers/favorites';

import { User } from '../models/user';


@Component({
  templateUrl: 'app.html',
  providers: [SectionAppearance, Favorites]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, icon: string, component: any}>;
  user: User;

  constructor(public platform: Platform, public menu: MenuController, public favorites: Favorites) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Mi Perfil', icon: "./assets/img/MenuIcons/icon_profile.png", component: ProfilePage },
      { title: 'Actividades', icon: "./assets/img/MenuIcons/icon_actividad.png", component: CategoriesPage },
      { title: 'Regiones', icon: "./assets/img/MenuIcons/icon_compass.png", component: CategoriesPage },
      { title: 'Mis Lugares Favoritos', icon: "./assets/img/MenuIcons/icon_heart.png", component: TownListPage },
      { title: 'Cerrar Sesión', icon: "./assets/img/MenuIcons/icon_settings.png", component: LoginPage }
    ];

    this.user = <User>{
      nombre: "Juan",
      apellido: "Ramos De La Cruz",
      imagen: "",
      correo: "",
      estado: "",
      edad: 32,
      genero: "M"
    };

    this.menu.swipeEnable(false);

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleLightContent();
      Splashscreen.hide();
    });
  }

  avatarClicked() {
     var options = {
        destinationType: Camera.DestinationType.FILE_URI,
        // In this app, dynamically set the picture source, Camera or photo gallery
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: false,
        correctOrientation: true  //Corrects Android orientation quirks
    };
    Camera.getPicture(options).then((imageData) => {

      Crop.crop( imageData ,{quality: 50}).then((newImage) => {
          this.user.imagen = newImage;
        }, (error) => {
          console.error("Error cropping image", error) 
      });
     //this.user.imagen = imageData;
    }, (err) => {
     // Handle error
     console.log(err);
    });
  }

  openPage(page) {
    if(page.component == TownListPage) {
      let townList = this.favorites.getFavorites();
      this.nav.setRoot(page.component, {'townList':townList});
    }else if(page.title === "Regiones") {
      this.nav.setRoot(page.component, {'regiones':true});
    }else {
      this.nav.setRoot(page.component);
    }
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    
  }

}
