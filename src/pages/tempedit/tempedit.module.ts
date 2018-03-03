import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TempEditPage } from './tempedit';

@NgModule({
  declarations: [
    TempEditPage,
  ],
  imports: [
    IonicPageModule.forChild(TempEditPage),
  ],
  exports:[
    TempEditPage,
  ]
})
export class TempEditPageModule {}
