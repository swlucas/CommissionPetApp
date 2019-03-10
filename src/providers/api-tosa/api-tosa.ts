import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { LoadingController } from "ionic-angular";

@Injectable()
export class ApiTosaProvider {
  apiUrl = "http://35.237.210.7/api-tosa/api/";
  // apiUrl = "http://127.0.0.1:8000/api/";


  constructor(
    public http: HttpClient,
    public storage: Storage,
    public loadingCtrl: LoadingController
  ) { }

  get(endPoint: string, params: object, callback: any, errorCall: any) {
    let loading = this.loadingCtrl.create({
      content: "Aguarde",
      spinner: "dots"
    });
    this.getToken().then((token) => {
      let headers = new HttpHeaders().set(
        "Authorization",
        "Bearer " + token
      );
      loading.present().then(() => {
        return new Promise((resolve, reject) => {
          this.http.get(this.apiUrl + endPoint, { headers: headers }).subscribe(
            res => {
              resolve(callback(res));
              loading.dismiss().catch(() => { });
            },
            err => {
              errorCall(err);
              loading.dismiss().catch(() => { });
            }
          );
        });
      });
    });
  }

  post(endPoint: string, params: object, callback: any, errorCall: any) {
    let loading = this.loadingCtrl.create({
      content: "Aguarde",
      spinner: "dots"
    });
    this.getToken().then((token) => {
      let headers = new HttpHeaders().set(
        "Authorization",
        "Bearer " + token
      );
      loading.present().then(() => {
        return new Promise((resolve, reject) => {
          this.http
            .post(this.apiUrl + endPoint, params, { headers: headers })
            .subscribe(
              res => {
                resolve(callback(res));
                loading.dismiss().catch(() => { });
              },
              err => {
                errorCall(err);
                loading.dismiss().catch(() => { });
              }
            );
        });
      });
    });
  }

  put(endPoint: string, params: object, callback: any, errorCall: any) {
    let loading = this.loadingCtrl.create({
      content: "Aguarde",
      spinner: "dots"
    });
    this.getToken().then((token) => {
      let headers = new HttpHeaders().set(
        "Authorization",
        "Bearer " + token
      );
      loading.present().then(() => {
        return new Promise((resolve, reject) => {
          this.http
            .put(this.apiUrl + endPoint, params, { headers: headers })
            .subscribe(
              res => {
                resolve(callback(res));
                loading.dismiss().catch(() => { });
              },
              err => {
                errorCall(err);
                loading.dismiss().catch(() => { });
              }
            );
        });
      });
    });
  }

  delete(endPoint: string, params: object, callback: any, errorCall: any) {
    let loading = this.loadingCtrl.create({
      content: "Aguarde",
      spinner: "dots"
    });
    this.getToken().then((token) => {
      let headers = new HttpHeaders().set(
        "Authorization",
        "Bearer " + token
      );
      loading.present().then(() => {
        return new Promise((resolve, reject) => {
          this.http
            .delete(this.apiUrl + endPoint, { headers: headers })
            .subscribe(
              res => {
                resolve(callback(res));
                loading.dismiss().catch(() => { });
              },
              err => {
                errorCall(err);
                loading.dismiss().catch(() => { });
              }
            );
        });
      });
    });
  }
  getToken() {
    return new Promise((resolve) => {
      this.storage.get("token").then(val => {
        resolve(val);
      });
    });
  }
}
