import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FirebaseService } from '../services/firebase.service';
import * as moment from 'moment';

/**
 * Generated class for the EventModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-modal',
  templateUrl: 'event-modal.html',
})
export class EventModalPage {
  event = {
    title: "",
    subject: "",
    description: "",
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    allDay: false
  };
  minDate = new Date().toISOString();

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private firebaseService: FirebaseService) {
    let preselectedDate = moment(this.navParams.get('selectedDay')).format();
    this.event.startTime = preselectedDate;
    this.event.endTime = preselectedDate;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventModalPage');
  }

  save() {
    let eventData = {
      title: this.event.title,
      subject: this.event.subject,
      description: this.event.description,
      startTime: this.event.startTime,
      endTime: this.event.endTime
    }
    this.firebaseService.createEvent(eventData);
    this.viewCtrl.dismiss(this.event);
  }

}
