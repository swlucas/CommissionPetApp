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
 * Generated class for the ModalServicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-modal-service",
  templateUrl: "modal-service.html"
})
export class ModalServicePage {
  service = {
    id: "",
    name: "",
    percentage: ""
  };
  serviceForm: FormGroup;
  constructor(
    public api: ApiTosaProvider,
    private alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    this.serviceForm = this.formBuilder.group({
      id: [],
      name: ["", [Validators.required, Validators.minLength(2)]],
      percentage: ["", [Validators.required, Validators.minLength(1)]]
    });
  }

  ionViewDidLoad() {
    let service = this.navParams.get("service");
    if (service) {
      this.service = service;
    }
  }

  createService() {
    let serviceData = {
      name: this.serviceForm.value.name,
      percentage: this.serviceForm.value.percentage
    };
    this.api.post(
      "service/create",
      serviceData,
      data => {
        console.log(data);
        if (data.success) {
          this.confirmCreate(data.success);
        } else {
          this.alertError(data.error);
        }
      },
      error => {}
    );
  }

  editService() {
    let serviceData = {
      id: this.serviceForm.value.id,
      name: this.serviceForm.value.name,
      percentage: this.serviceForm.value.percentage
    };
    this.api.put(
      "service/" + serviceData.id + "/update",
      serviceData,
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
  getServiceById(id: number) {
    this.api.get(
      "service/" + id + "/get",
      {},
      data => {
        console.log(data);
        this.service = data;
      },
      error => {
        console.log(error);
      }
    );
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
            this.serviceForm.reset();
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
          handler: () => {}
        }
      ]
    });
    alert.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
