import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FirebaseService } from '../services/firebase.service';

/**
 * Generated class for the SubjectModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-subject-modal',
  templateUrl: 'subject-modal.html',
})
export class SubjectModalPage {

  subject_days = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado"
  ];

  subject = {
    name: "",
    credits: 0,
    teacher: "",
    day: "",
    hour: "",
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private firebaseService: FirebaseService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubjectModalPage');
  }

  save() {
    let data = {
      name: this.subject.name,
      credits: Number(this.subject.credits),
      teacher: this.subject.teacher,
      days: this.subject.day,
      hour: String(this.subject.hour)
    }
    this.firebaseService.createSubject(data)
    .then(
      res => {
        //this.resetFields();
        this.viewCtrl.dismiss(this.subject);
      }
    )
  }
}
