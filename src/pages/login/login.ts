import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ApiTosaProvider } from "../../providers/api-tosa/api-tosa";
import { Storage } from "@ionic/storage";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  loginForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiTosaProvider,
    public storage: Storage
  ) {
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.loginForm = this.formBuilder.group({
      email: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(emailRegex)
        ])
      ],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad LoginPage");
  }

  goSignupPage() {
    this.navCtrl.setRoot("SignupPage");
  }

  goForgotpasswordPage() {
    this.navCtrl.setRoot("ForgotpasswordPage");
  }

  onSubmit() {
    let loginData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.api.post(
      "login",
      loginData,
      data => {
        console.log(data);
        if (data.success) {
          this.storage.set("token", data.success.token).then(() => {
            this.navCtrl.setRoot("HomePage");
          });
        }
      },
      error => {
        console.log(error);

      }
    );
  }
}
