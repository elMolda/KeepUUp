import { Component } from '@angular/core';
import { ViewController, NavParams, AlertController, LoadingController, ModalController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { NewActivityModalPage } from '../new-activity-modal/new-activity-modal';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class DetailsPage {

  validations_form: FormGroup;
  item: any;
  loading: any;
  acts: Array<any>;
  promedio: any;
  nota: any;

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private loadingCtrl: LoadingController
  ) {
    this.loading = this.loadingCtrl.create();
  }

  ionViewWillLoad(){
    this.getData()
    //this.getNota()
  }

  getData(){
    this.item = this.navParams.get('data');
    this.firebaseService.getActivities(this.item.id).then(tasks => {
      this.acts = tasks;
    }),
    this.validations_form = this.formBuilder.group({
    name: new FormControl('', Validators.required),
    credits: new FormControl('', Validators.required),
    teacher: new FormControl('', Validators.required)
    });
  }

  getNota(){
    this.promedio = 0;
    this.nota = 0;
    for(let act of this.acts){
      this.promedio +=Number(act.payload.doc.data().value);
      this.nota += ((Number(act.payload.doc.data().value)/100)*Number(act.payload.doc.data().score));
      console.log(this.nota);
    }
    this.item.finalScore = this.nota;
    this.item.percent = this.promedio;
    this.onSubmit(this.item);
  }

  dismiss() {
   this.viewCtrl.dismiss();
  }

  onSubmit(value){
    let data = {
      name: value.name,
      credits: Number(value.credits),
      teacher: value.teacher,
      finalScore: this.item.finalScore,
      percent: this.item.percent
    }
    this.firebaseService.updateSubject(this.item.id,data)
    .then(
      res => {
        this.viewCtrl.dismiss();
      }
    )
  }

  delete() {
    let confirm = this.alertCtrl.create({
      title: 'Confirmar',
      message: 'Quieres eliminar ' + this.item.name + '?',
      buttons: [
        {
          text: 'No',
          handler: () => {}
        },
        {
          text: 'Si',
          handler: () => {
            this.firebaseService.deleteSubject(this.item.id)
            .then(
              res => this.viewCtrl.dismiss(),
              err => console.log(err)
            )
          }
        }
      ]
    });
    confirm.present();
  }

  openNewActivityModal(){
    let modal = this.modalCtrl.create(NewActivityModalPage, { id: this.item.id, name:this.item.name, teacher:this.item.teacher, credits:this.item.credits});
    modal.onDidDismiss(data => {
      this.getData();
    });
    modal.present();
  }
}
