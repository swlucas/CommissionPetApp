import { Component } from "@angular/core";
import {
  IonicPage,
  ModalController,
  NavController,
  NavParams
} from "ionic-angular";

import { ApiTosaProvider } from "../../providers/api-tosa/api-tosa";
import { AlertController } from "ionic-angular";

@IonicPage({ defaultHistory: ["HomePage"] })
@Component({
  selector: "page-service",
  templateUrl: "service.html"
})
export class ServicePage {
  services: any;

  constructor(
    public api: ApiTosaProvider,
    public modal: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController
  ) {}

  ionViewWillEnter() {
    this.getAllService();
  }

  getAllService() {
    this.api.get(
      "service/get",
      {},
      data => {
        console.log(data);

        this.services = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteService(id: number) {
    console.log(id);
    this.api.delete(
      "service/" + id + "/delete",
      {},
      data => {
        this.getAllService();
        this.alertCtrl
          .create({
            title: "Excluido com Sucesso!"
          })
          .present();
      },
      error => {
        console.log(error);
      }
    );
  }

  solicitDelete(id: number, name: string) {
    this.alertCtrl
      .create({
        title: "Deseja excluir " + name + "?",
        buttons: [
          {
            text: "Cancelar",
            role: "cancel"
          },
          {
            text: "Excluir",
            handler: () => {
              this.deleteService(id);
            }
          }
        ]
      })
      .present();
  }

  openModal(service?) {
    this.modal.create("ModalServicePage", { service }).present();
  }
}
