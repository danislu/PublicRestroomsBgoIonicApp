import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { NgReduxModule } from 'ng2-redux';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { MyApp } from './app.component';
import { ContactPage } from '../pages/contact/contact';
import { MapPage2 } from '../pages/map/map';
import { Map } from '../components/map/map';
import { TabsPage } from '../pages/tabs/tabs';
import { ALL_ACTIONS } from './../actions';

@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    MapPage2,
    Map,
    TabsPage
  ],
  imports: [
    NgReduxModule,
    HttpModule,
    CommonModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    MapPage2,
    TabsPage
  ],
  providers: [ ALL_ACTIONS ]
})
export class AppModule {}
