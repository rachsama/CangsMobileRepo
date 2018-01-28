import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';

export interface PageInterface {
  title: string;
  pageName: string;
  tabComponent?: any;
  index?: number;
  icon: string;
}

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})

export class MenuPage{

    rootPage = 'TabsPage';
    @ViewChild(Nav) nav: Nav;

    pages: PageInterface[] = [
        {title: 'OrderPage', pageName: 'TabsPage', tabComponent: 'OrderPage', index: 0, icon:'home'},
        {title: 'HistoryPage', pageName: 'TabsPage', tabComponent: 'HistoryPage', index: 1, icon:'contacts'},
    ]

    constructor(public navCtrl: NavController, public navParam: NavParams) {
    }
  
    openPage(page: PageInterface){
        let param = {};

        if (page.index)
            param = {tabIndex: page.index};

        if(this.nav.getActiveChildNav() && page.index != undefined) 
        {
            this.nav.getActiveChildNav().select(page.index);
        }
        else
        {
            this.nav.setRoot(page.pageName, param);
        }
    }

    isActive(page: PageInterface){
        let childNav = this.nav.getActiveChildNav();

        if(childNav)
        {
            if(childNav.getSelected() && childNav.getSelected().root === page.tabComponent)
            {
                return 'primary';
            }
            return;
        }

        if(this.nav.getActive() && this.nav.getActive().name === page.pageName)
        {
            return 'primary';
        }
    }

}