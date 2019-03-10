import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalServicePage } from './modal-service';

@NgModule({
  declarations: [
    ModalServicePage,
  ],
  imports: [
    IonicPageModule.forChild(ModalServicePage),
  ],
})
export class ModalServicePageModule {}
