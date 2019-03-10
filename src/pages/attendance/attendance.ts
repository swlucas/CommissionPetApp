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
  selector: "page-attendance",
  templateUrl: "attendance.html"
})
export class AttendancePage {
  attendances: any;

  constructor(
    public api: ApiTosaProvider,
    public modal: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController
  ) { }

  ionViewWillEnter() {
    this.getAllAttendance();
  }

  getAllAttendance() {
    this.api.get(
      "/attendance/get",
      {},
      data => {
        console.log(data);

        this.attendances = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteAttendance(id: number) {
    console.log(id);
    this.api.delete(
      "attendance/" + id + "/delete",
      {},
      data => {
        this.getAllAttendance();
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
              this.deleteAttendance(id);
            }
          }
        ]
      })
      .present();
  }

  solicitEdit(id: number, name: string, percentage: any) {
    let alert = this.alertCtrl.create();
    alert.setTitle("Deseja editar " + name + "?");
    alert.addInput({ name: "name", placeholder: "Nome", value: name });
    alert.addInput({
      type: "number",
      name: "percentage",
      placeholder: "%",
      value: percentage
    });
    alert.addButton("Cancelar");
    alert.addButton({
      text: "Editar",
      handler: data => {
        // this.editAttendance(id, data);
      }
    });
    alert.present();
  }

  // solicitCreate() {
  //   let alert = this.alertCtrl.create();
  //   alert.setTitle("Novo Attendance");
  //   alert.addInput({ type: "text", name: "name", placeholder: "Nome" });
  //   alert.addInput({ type: "text", name: "type", placeholder: "Tipo" });
  //   alert.addInput({ type: "text", name: "breed", placeholder: "Raça" });
  //   alert.addInput({ type: "number", name: "weigth", placeholder: "Peso" });
  //   alert.addInput({ type: "number", name: "age", placeholder: "Idade" });
  //   alert.addInput({
  //     type: "text",
  //     name: "owner",
  //     placeholder: "Proprietário"
  //   });
  //   alert.addButton("Cancelar");
  //   alert.addButton({
  //     text: "Adicionar",
  //     handler: data => {
  //       this.createAttendance(data);
  //     }
  //   });
  //   alert.present();
  // }

  openModal(attendance?, action?: string) {
    this.modal.create("ModalAttendancePage", { attendance, action }).present();
  }
}
