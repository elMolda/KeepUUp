import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SchedulePage } from './schedule';
import { NgCalendarModule  } from 'ionic2-calendar';
import { FirebaseService } from '../services/firebase.service';

@NgModule({
  declarations: [
    SchedulePage,
  ],
  imports: [
    IonicPageModule.forChild(SchedulePage),
    NgCalendarModule,
  ],
})
export class SchedulePageModule {

}
