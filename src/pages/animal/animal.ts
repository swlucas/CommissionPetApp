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
  selector: "page-animal",
  templateUrl: "animal.html"
})
export class AnimalPage {
  animals: any;

  constructor(
    public api: ApiTosaProvider,
    public modal: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController
  ) { }

  ionViewWillEnter() {
    this.getAllAnimal();
  }

  getAllAnimal() {
    this.api.get(
      "animal/get",
      {},
      data => {
        console.log(data);

        this.animals = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteAnimal(id: number) {
    console.log(id);
    this.api.delete(
      "animal/" + id + "/delete",
      {},
      data => {
        this.getAllAnimal();
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
              this.deleteAnimal(id);
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
        // this.editAnimal(id, data);
      }
    });
    alert.present();
  }

  // solicitCreate() {
  //   let alert = this.alertCtrl.create();
  //   alert.setTitle("Novo Animal");
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
  //       this.createAnimal(data);
  //     }
  //   });
  //   alert.present();
  // }

  openModal(animal?, action?: string) {
    this.modal.create("ModalAnimalPage", { animal, action }).present();
  }
}
