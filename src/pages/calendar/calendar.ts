import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { FirebaseService } from '../services/firebase.service';
import { EventModalPage } from '../event-modal/event-modal';
import * as moment from 'moment';

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
  events;
  acts: Array<any>;
  viewTitle: string;
  selectedDay = new Date();
  calendarModes = [
    { key: 'month', value: 'Mes' },
    { key: 'week', value: 'Semana' },
    { key: 'day', value: 'Día' },
  ]
  calendar = {
    mode: this.calendarModes[1].key,
    currentDate: this.selectedDay,
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, private firebaseService: FirebaseService, private modalCtrl: ModalController, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarPage');
    this.getData();
  }

  getData(){
    this.firebaseService.getEvents()
    .then(tasks => {
      this.items = tasks;
      for (let item of this.items) {
        let eventData = {
          title: item.payload.doc.data().title,
          subject: item.payload.doc.data().subject,
          description: item.payload.doc.data().description,
          startTime: new Date(item.payload.doc.data().startTime),
          endTime: new Date(item.payload.doc.data().endTime),
        }
        this.events = this.eventSource;
          this.events.push(eventData);
      }
      this.eventSource = [];
          setTimeout(() => {
            this.eventSource = this.events;
        });
    })
  }

  addEvent() {
    let modal = this.modalCtrl.create(EventModalPage, {selectedDay: this.selectedDay});
    modal.present();

    modal.onDidDismiss(data => {
      if (data) {
        let eventData = data;

        eventData.startTime = new Date(data.startTime);
        eventData.endTime = new Date(data.endTime);

        let events = this.eventSource;
        events.push(eventData);
        this.eventSource = [];
        setTimeout(() => {
          this.eventSource = events;
        });
      }
    });
  }

  onCurrentDateChanged(event) {

  }

  reloadSource(startTime, endTime) {

  }

  onEventSelected(event) {
    let start = moment(event.startTime).format('LLLL');
    let end = moment(event.endTime).format('LLLL');

    let alert = this.alertCtrl.create({
      title: '' + event.title,
      subTitle: 'Materia: ' + event.subject + '<br>Descripción: ' + event.description + '<br>Inicio: ' + start + '<br>Fin: ' + end,
      buttons: ['OK']
    });
    alert.present();
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onTimeSelected(event) {
    this.selectedDay = event.selectedTime;
  }

  onOptionSelected (mode) {

  }

}
