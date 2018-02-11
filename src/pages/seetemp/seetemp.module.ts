import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeeTempPage } from './seetemp';

@NgModule({
  declarations: [
    SeeTempPage,
  ],
  imports: [
    IonicPageModule.forChild(SeeTempPage),
  ],
})
export class SeeTempPageModule {}
