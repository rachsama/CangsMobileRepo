import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TempGetPage } from './tempget';

@NgModule({
  declarations: [
    TempGetPage,
  ],
  imports: [
    IonicPageModule.forChild(TempGetPage),
  ],
  exports:[
    TempGetPage,
  ]
})
export class TempGetPageModule {}
