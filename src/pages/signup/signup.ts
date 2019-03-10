import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ApiTosaProvider } from "../../providers/api-tosa/api-tosa";
import { Storage } from "@ionic/storage";

@IonicPage()
@Component({
  selector: "page-signup",
  templateUrl: "signup.html"
})
export class SignupPage {
  signupForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiTosaProvider,
    public storage: Storage
  ) {
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.signupForm = this.formBuilder.group({
      name: [
        "",
        Validators.compose([
          Validators.maxLength(30),
          Validators.pattern("[a-zA-ZçÇ ]*"),
          Validators.required
        ])
      ],
      email: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(emailRegex)
        ])
      ],
      password: ["", [Validators.required, Validators.minLength(6)]],
      c_password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  goSignupPage() {
    this.navCtrl.setRoot("SignupPage");
  }

  goLoginPage() {
    this.navCtrl.push("LoginPage");
  }

  onSubmit() {
    let signupData = {
      name: this.signupForm.value.name,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      c_password: this.signupForm.value.c_password
    };
    this.api.post(
      "register",
      signupData,
      data => {
        if (data.success) {
          this.storage.set("token", data.success.token).then(val => {
            this.navCtrl.setRoot("HomePage");
          });
        }
      },
      error => {}
    );
  }
}
