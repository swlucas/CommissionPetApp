import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalAnimalPage } from './modal-animal';

@NgModule({
  declarations: [
    ModalAnimalPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalAnimalPage),
  ],
})
export class ModalAnimalPageModule {}
