import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseService } from '../services/firebase.service';

/**
 * Generated class for the CalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {
  items: Array<any>;
  eventSource = [];
  selectedDay = new Date();
  calendarModes = [
    { key: 'month', value: 'Month' },
    { key: 'week', value: 'Week' },
    { key: 'day', value: 'Day' },
  ]
  calendar = {
    mode: this.calendarModes[1].key,
    currentDate: this.selectedDay,
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, private firebaseService: FirebaseService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarPage');
    this.getData();
  }

  getData(){
    this.firebaseService.getSubjects()
    .then(tasks => {
      this.items = tasks;
    })
  }

  onCurrentDateChanged(event) {

  }

  reloadSource(startTime, endTime) {

  }

  onEventSelected(event) {

  }

  onViewTitleChanged(event) {

  }

  onTimeSelected(event) {

  }

  onOptionSelected (mode) {

  }

}
