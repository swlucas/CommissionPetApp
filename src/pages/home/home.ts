import { Component } from "@angular/core";
import { NavController, IonicPage } from "ionic-angular";
import { ApiTosaProvider } from "../../providers/api-tosa/api-tosa";
import { Storage } from "@ionic/storage";

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  dashboard = {
    animal: "",
    attendances: "",
    earnings: ""
  };

  constructor(
    public navCtrl: NavController,
    public api: ApiTosaProvider,
    public storage: Storage
  ) { }
  ionViewDidEnter() {
    this.getDashboard();
  }

  getDashboard() {
    this.api.get(
      "dashboard",
      {},
      data => {
        this.dashboard = data;
      },
      error => {
        console.log("Error " + error.message);
      }
    );
  }

  goServicePage() {
    this.navCtrl.push("ServicePage");
  }

  goAnimalPage() {
    this.navCtrl.push("AnimalPage");
  }

  goAttendancePage() {
    this.navCtrl.push("AttendancePage");
  }
  logout() {
    this.storage.remove("token").then(() => {
      this.navCtrl.setRoot("StartPage");
    });
  }
}
