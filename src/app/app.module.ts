import { NgModule, ErrorHandler, Injector } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

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

import { StateList } from '../providers/state-list';
import { SectionAppearance } from '../providers/section-appearance';
import { TownInfo } from '../providers/town-info';
import { Favorites } from '../providers/favorites';

import { ServiceLocator } from '../models/service-locator';

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
    GalleryPage

  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      tabsPlacement: 'bottom',
    }, {}
  )],
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
    GalleryPage

  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler },
    StateList,
    SectionAppearance,
    TownInfo,
    Favorites
    ]
})
export class AppModule {
  constructor(private injector: Injector) {
    ServiceLocator.injector = this.injector;
  }
}
