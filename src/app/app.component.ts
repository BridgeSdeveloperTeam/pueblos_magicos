import { Component, ViewChild, NgZone } from '@angular/core';
import { Nav, Platform, MenuController, Events } from 'ionic-angular';
import { StatusBar, Splashscreen, GoogleAnalytics } from 'ionic-native';
import { Push, PushToken } from '@ionic/cloud-angular';

import { LoginPage } from '../pages/login/login';
import { CategoriesPage } from '../pages/categories/categories';
import { TownListPage } from '../pages/town-list/town-list';
import { ProfilePage } from '../pages/profile/profile';

import { SectionAppearance } from '../providers/section-appearance';
import { Favorites } from '../providers/favorites';
import { ImagePath } from '../providers/image-path';
import { RestUser } from '../providers/rest-user';
import { CameraUpload } from '../providers/camera-upload';

import { User } from '../models/user';


@Component({
  templateUrl: 'app.html',
  providers: [SectionAppearance, Favorites, ImagePath, RestUser]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, icon: string, component: any}>;
  user: User;

  constructor(public platform: Platform, public menu: MenuController, public favorites: Favorites, public restUser: RestUser, public events: Events, private imagePath:ImagePath, private cameraUpload:CameraUpload, private zone: NgZone, private push:Push) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Mi Perfil', icon: "./assets/img/MenuIcons/icon_profile.png", component: ProfilePage },
      { title: 'Actividades', icon: "./assets/img/MenuIcons/icon_actividad.png", component: CategoriesPage },
      { title: 'Regiones', icon: "./assets/img/MenuIcons/icon_compass.png", component: CategoriesPage },
      { title: 'Mis Lugares Favoritos', icon: "./assets/img/MenuIcons/icon_heart.png", component: TownListPage },
      { title: 'Cerrar Sesión', icon: "./assets/img/MenuIcons/icon_settings.png", component: LoginPage }
    ];
    this.user = new User();

    this.restUser.getUserPromise().then((val) => {
      if(val != null) {
        this.user = <User>val;
  
        if(parseInt(this.user.id) > 0) {
          this.rootPage = CategoriesPage;
          this.favorites.getFavoritesRest(this.user.id);
          this.restUser.logId(this.user.id);
        }else {
          this.rootPage = LoginPage;
        }
      }else {
        this.rootPage = LoginPage;
      }
    });

    this.events.subscribe('user:loggedIn', currentUser => {
          this.user = currentUser;
    });

    this.events.subscribe('user:pictureChanged', photoUrl => {
      //Photo didn't update without this
      this.zone.run(() => {
        this.user.foto_perfil = photoUrl; 
      });
    });

    this.menu.swipeEnable(false);

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleLightContent();
      Splashscreen.hide();

      GoogleAnalytics.startTrackerWithId('UA-90564283-1')
      .then(() => {
        
       // Tracker is ready
       // You can now track pages or set additional information such as AppVersion or UserId
      })
      .catch(e => console.log('Error starting GoogleAnalytics', e));

      
      this.push.register().then((t: PushToken) => {
        return this.push.saveToken(t);
      }).then((t: PushToken) => {

      });
    });
  }

  getPhotoUrl(){
    if(this.user.foto_perfil && this.user.foto_perfil.length>0) {
      //Server
      if(this.user.foto_perfil.indexOf("img") >=0) {
        return this.imagePath.getFullPath(this.user.foto_perfil);
      }else {
        return this.user.foto_perfil;
      }
      
    }else {
      //Default
      return './assets/img/photo_placeholder.png';
    }
  }

  getFullName() {
    return this.user.nombre + " " + this.user.apellido;
  }

  avatarClicked() {
     this.cameraUpload.selectPictureAndUpload();
  }

  openPage(page) {
    if(page.component == LoginPage) {
      this.restUser.clearStorage();
    }

    if(page.component == TownListPage) {
      GoogleAnalytics.trackView("Favoritos");
      let townList = this.favorites.getFavorites();
      this.nav.setRoot(page.component, {'townList':townList});
    }else if(page.title === "Regiones") {
      this.nav.setRoot(page.component, {'regiones':true});
    }else {
      this.nav.setRoot(page.component);
    }
    
  }

}
