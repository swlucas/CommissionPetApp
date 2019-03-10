import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ApiTosaProvider } from "../../../providers/api-tosa/api-tosa";
import { AlertController } from "ionic-angular";

/**
 * Generated class for the ModalAttendancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-modal-attendance",
  templateUrl: "modal-attendance.html"
})
export class ModalAttendancePage {
  services: any;
  animals: any;
  chips: any = [];

  action: string;
  attendance = {
    id: "",
    animal_id: "",
    service_id: [],
    value: []
  };

  attendanceForm: FormGroup;
  constructor(
    public api: ApiTosaProvider,
    private alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    this.attendanceForm = this.formBuilder.group({
      id: [],
      animal_id: ["", [Validators.required]],
      service_id: ["", [Validators.required]],
      value: ["", [Validators.required]]
    });
  }

  ionViewDidLoad() {
    this.action = this.navParams.get("action");
    let attendance = this.navParams.get("attendance");
    if (attendance) {
      this.attendance = attendance;
    }
    this.getAllAnimal();
    this.getAllService();
  }

  createAttendance() {
    let attendanceData = {
      animal_id: this.attendanceForm.value.animal_id,
      service_id: this.attendanceForm.value.service_id,
      value: this.attendance.value
    };

    this.api.post(
      "attendance/create",
      attendanceData,
      data => {
        console.log(data);
        if (data.success) {
          this.confirmCreate(data.success);
        } else {
          this.alertError(data.error);
        }
      },
      error => { }
    );
  }

  editAttendance() {
    let attendanceData = {
      id: this.attendanceForm.value.id,
      name: this.attendanceForm.value.name,
      species: this.attendanceForm.value.species,
      breed: this.attendanceForm.value.breed,
      weight: this.attendanceForm.value.weight,
      age: this.attendanceForm.value.age,
      owner: this.attendanceForm.value.owner,
      gender: this.attendanceForm.value.gender,
      fur: this.attendanceForm.value.fur,
      image: this.attendanceForm.value.image
    };
    this.api.put(
      "attendance/" + attendanceData.id + "/update",
      attendanceData,
      data => {
        let alert = this.alertCtrl.create();
        alert.setTitle(data.success);
        alert.present();
        this.dismiss();
      },
      error => {
        console.log(error);
      }
    );
  }

  getAttendanceById() {
    this.api.get(
      "attendance/get",
      {},
      data => {
        console.log(data);
        this.attendance = data;
      },
      error => {
        console.log(error);
      }
    );
  }
  getAllAnimal() {
    this.api.get(
      "animal/get",
      {},
      data => {
        this.animals = data;
      },
      error => {
        console.log(error);
      }
    );
  }
  getAllService() {
    this.api.get(
      "service/get",
      {},
      data => {
        this.services = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  addChip() {
    this.chips = [];
    for (var i = 0; i < this.attendance.service_id.length; i++) {
      for (var j = 0; j < this.services.length; j++) {
        if (this.attendance.service_id[i] == this.services[j].id) {
          this.chips[i] = this.services[j];
        }
      }
    }
  }

  confirmCreate(title) {
    let alert = this.alertCtrl.create({
      title: title,
      message: "Deseja continuar adicionando?",
      buttons: [
        {
          text: "Continuar",
          role: "cancel",
          handler: () => {
            this.attendanceForm.reset();
          }
        },
        {
          text: "Voltar",
          handler: () => {
            this.viewCtrl.dismiss();
          }
        }
      ]
    });
    alert.present();
  }

  alertError(title) {
    let alert = this.alertCtrl.create({
      title: title,
      buttons: [
        {
          text: "Ok",
          role: "cancel",
          handler: () => { }
        }
      ]
    });
    alert.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
