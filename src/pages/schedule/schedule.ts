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
  lunes;
  martes;
  miercoles;
  jueves;
  viernes;
  sabado;

  constructor(public navCtrl: NavController, public navParams: NavParams, private firebaseService: FirebaseService) {
    this.lunes = [];
    this.martes = [];
    this.miercoles = [];
    this.jueves = [];
    this.viernes = [];
    this.sabado = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchedulePage');
    this.getData();
  }

  getData(){
    this.firebaseService.getSubjects()
    .then(tasks => {
      this.items = tasks;
      for (let item of this.items) {
        let data = {
          name: item.payload.doc.data().name,
          credits: item.payload.doc.data().credits,
          teacher: item.payload.doc.data().teacher,
          days: item.payload.doc.data().days,
          hour: item.payload.doc.data().hour
        }
        if (item.payload.doc.data().days == "Lunes") {
          console.log("Lunes: " + item.payload.doc.data().name);
          this.lunes.push(data);
        }
        if (item.payload.doc.data().days == "Martes") {
          console.log("Martes:" + item.payload.doc.data().name);
          this.martes.push(data);
        }
        if (item.payload.doc.data().days == "Miércoles") {
          console.log("Miércoles:" + item.payload.doc.data().name);
          this.miercoles.push(data);
        }
        if (item.payload.doc.data().days == "Jueves") {
          console.log("Jueves:" + item.payload.doc.data().name);
          this.jueves.push(data);
        }
        if (item.payload.doc.data().days == "Viernes") {
          console.log("Viernes:" + item.payload.doc.data().name);
          this.viernes.push(data);
        }
        if (item.payload.doc.data().days == "Sábado") {
          console.log("Sábado:" + item.payload.doc.data().name);
          this.sabado.push(item);
        }
      }
    })
  }
}
