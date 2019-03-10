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
 * Generated class for the ModalAnimalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-modal-animal",
  templateUrl: "modal-animal.html"
})
export class ModalAnimalPage {
  action;
  animal = {
    id: "",
    name: "",
    age: "",
    breed: "",
    fur: "",
    gender: "",
    owner: "",
    species: "",
    weight: "",
    image: ""
  };
  animalForm: FormGroup;
  constructor(
    public api: ApiTosaProvider,
    private alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    this.animalForm = this.formBuilder.group({
      id: [],
      name: ["", [Validators.required, Validators.minLength(2)]],
      species: ["", [Validators.required, Validators.minLength(1)]],
      breed: [],
      gender: [],
      fur: [],
      weight: ["", [Validators.required, Validators.minLength(1)]],
      age: [],
      owner: ["", [Validators.required, Validators.minLength(1)]],
      image: []
    });
  }

  ionViewDidLoad() {
    this.action = this.navParams.get("action");
    let animal = this.navParams.get("animal");
    if (animal) {
      this.animal = animal;
    }
  }

  createAnimal() {
    let animalData = {
      name: this.animalForm.value.name,
      species: this.animalForm.value.species,
      breed: this.animalForm.value.breed,
      weight: this.animalForm.value.weight,
      age: this.animalForm.value.age,
      owner: this.animalForm.value.owner,
      gender: this.animalForm.value.gender,
      fur: this.animalForm.value.fur,
      image: this.animalForm.value.image
    };
    this.api.post(
      "animal/create",
      animalData,
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

  editAnimal() {
    let animalData = {
      id: this.animalForm.value.id,
      name: this.animalForm.value.name,
      species: this.animalForm.value.species,
      breed: this.animalForm.value.breed,
      weight: this.animalForm.value.weight,
      age: this.animalForm.value.age,
      owner: this.animalForm.value.owner,
      gender: this.animalForm.value.gender,
      fur: this.animalForm.value.fur,
      image: this.animalForm.value.image
    };
    this.api.put(
      "animal/" + animalData.id + "/update",
      animalData,
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
  getAnimalById(id: number) {
    this.api.get(
      "animal/" + id + "/get",
      {},
      data => {
        console.log(data);
        this.animal = data;
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
            this.animalForm.reset();
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
