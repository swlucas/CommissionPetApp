import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalAttendancePage } from './modal-attendance';

@NgModule({
  declarations: [
    ModalAttendancePage,
  ],
  imports: [
    IonicPageModule.forChild(ModalAttendancePage),
  ],
})
export class ModalAttendancePageModule {}
