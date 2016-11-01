import { Component } from '@angular/core';

import { MapPage2 } from '../map/map';
import { ContactPage } from '../contact/contact';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = MapPage2;
  tab2Root: any = ContactPage;

  constructor() {}
}
