import { NgModule, ErrorHandler, Injector } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { CategoriesPage } from '../pages/categories/categories';
import { RegisterPage } from '../pages/register/register';
import { StateListPage } from '../pages/state-list/state-list';
import { TownListPage } from '../pages/town-list/town-list';
import { TabsPage } from '../pages/tabs/tabs';
import { LandingPage } from '../pages/landing/landing';
import { TownTemplatePage } from '../pages/town-template/town-template';
import { SearchPage } from '../pages/search/search';
import { GalleryPage } from '../pages/gallery/gallery';
import { ProfilePage } from '../pages/profile/profile';
import { MapPage } from '../pages/map/map';
import { TownSplashPage } from '../pages/town-splash/town-splash';
import { CompaniesPage } from '../pages/companies/companies';

import { StateList } from '../providers/state-list';
import { SectionAppearance } from '../providers/section-appearance';
import { TownInfo } from '../providers/town-info';
import { Favorites } from '../providers/favorites';
import { ImagePath } from '../providers/image-path';
import { RestUser } from '../providers/rest-user';
import { CameraUpload } from '../providers/camera-upload';
import { GoogleDirections } from '../providers/google-directions';

import { ServiceLocator } from '../models/service-locator';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '488771c4'
  },
  'push': {
    'sender_id': '72637084292',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
       
      }
    }
  }
};

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    CategoriesPage,
    RegisterPage,
    StateListPage,
    TownListPage,
    TabsPage,
    LandingPage,
    TownTemplatePage,
    SearchPage,
    GalleryPage,
    ProfilePage,
    MapPage,
    TownSplashPage,
    CompaniesPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      tabsPlacement: 'bottom',
    }, {}),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    CategoriesPage,
    RegisterPage, 
    StateListPage,
    TownListPage,
    TabsPage,
    LandingPage,
    TownTemplatePage,
    SearchPage,
    GalleryPage,
    ProfilePage,
    MapPage,
    TownSplashPage,
    CompaniesPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler },
    StateList,
    SectionAppearance,
    TownInfo,
    Favorites,
    ImagePath,
    RestUser,
    CameraUpload,
    GoogleDirections
    ]
})
export class AppModule {
  constructor(private injector: Injector) {
    ServiceLocator.injector = this.injector;
  }
}
