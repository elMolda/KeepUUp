import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseService } from '../services/firebase.service';

/**
 * Generated class for the SchedulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
})
export class SchedulePage {

  items: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private firebaseService: FirebaseService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchedulePage');
    this.getData();
  }

  getData(){
    this.firebaseService.getSubjects()
    .then(tasks => {
      this.items = tasks;
    })
  }
}
