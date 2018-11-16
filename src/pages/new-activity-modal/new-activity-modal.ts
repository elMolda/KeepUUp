import { Component } from '@angular/core';
import { ViewController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import * as moment from 'moment';

@Component({
  selector: 'page-new-activity-modal',
  templateUrl: 'new-activity-modal.html',
})
export class NewActivityModalPage {
  
  validations_form: FormGroup;
  loading: any;
  item: any;
  acts: Array<any>;
  promedio: any;
  nota: any;

  constructor(
    private viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private loadingCtrl: LoadingController
    ) {
      this.loading = this.loadingCtrl.create();
      this.item = viewCtrl.data;
      this.getData();
  }

  getData(){
    this.firebaseService.getActivities(this.item.id).then(tasks => {
      this.acts = tasks;
    }),
    this.validations_form = this.formBuilder.group({
    name: new FormControl('', Validators.required),
    credits: new FormControl('', Validators.required),
    teacher: new FormControl('', Validators.required)
    });
  }
  ionViewWillLoad(){
    this.resetFields()
  }

  resetFields(){
    this.validations_form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      value: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      score: new FormControl('', Validators.required)
    });
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  onSubmit(value){
    let data = {
      name: value.name,
      value: Number(value.value),
      date: new Date(value.date),
      score: Number(value.score)
    }
    let eventData = {
      title: value.name,
      subject: this.item.name,
      description: value.name + ' - ' + this.item.name,
      startTime: new Date(value.date).toISOString(),
      endTime: new Date(value.date).toISOString()
    }
    this.promedio = data.value;
    this.nota = (data.value/100)*data.score;
    for(let act of this.acts){
      this.promedio +=Number(act.payload.doc.data().value);
      this.nota += ((Number(act.payload.doc.data().value)/100)*Number(act.payload.doc.data().score));
      console.log(this.nota);
    }
    if(this.promedio<=100){

      console.log(this.item.teacher);
      let data1 = {
        credits: this.item.credits,
        finalScore: this.nota,
        name: this.item.name,
        percent: this.promedio,
        teacher: this.item.teacher

      }
      this.firebaseService.updateSubject(this.item.id,data1)
      .then(
      )

      this.firebaseService.createActivity(data,this.item.id)
      .then(
        res => {
          this.resetFields();
          this.viewCtrl.dismiss();
        }
      )
      this.item.finalScore = this.nota;
      this.item.percent = this.promedio;
    }else{
      console.log('La suma de los porcentaje es superior al 100%');
    }
    this.firebaseService.createEvent(eventData)
  }



}
