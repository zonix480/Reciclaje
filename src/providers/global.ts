import { Injectable } from '@angular/core';
import { MenuController, ToastController, LoadingController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform } from '@ionic/angular';
import { HttpHeaders } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { ApiProvider } from "./api";
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Router } from '@angular/router';

/**
 * User provider from server
 */
@Injectable()
export class GlobalProvider {

  isLoading = false;
  alertConfirm : any;
  alertSimple : any;
  currentVersion: string;

  /**
   * Constructor Method
   * @param any
   */
  constructor(private menu: MenuController,
    public toastController: ToastController,
    public loadingController: LoadingController,
    private modalController: ModalController,
    private nativeStorage: NativeStorage,
    public alertController: AlertController,
    private datePipe: DatePipe,
    private callNumber: CallNumber,
    public plt: Platform,
    public router: Router,
    public apiProv: ApiProvider,
    private appVersion: AppVersion) {
  }

  /**
   * Notify
   * @param params
   */
  public async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  public menuShow(active: boolean) {
    this.menu.enable(active, 'custom');
  }

  async showLoader() {
    this.isLoading = true;
    return await this.loadingController.create({
      message: 'Cargando...',
    }).then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('close presenting'));
        }
      });
    });
  }

  async hideLoader() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('loader dismissed'));
  }


  public setStorage(variable: string, data: object) {
    if (this.plt.is('ios') || this.plt.is('android')) {
      this.nativeStorage.setItem(variable, data)
        .then(
          () => console.log('Stored item!'),
          error => console.error('Error storing item', error)
        );
    } else {
      localStorage.setItem(variable, JSON.stringify(data));
    }
  }


  public getStorage(variable: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.plt.is('ios') || this.plt.is('android')) {
        this.nativeStorage.getItem(variable)
          .then(
            data => resolve(data),
            error => resolve("")
          )
          .catch(e => {
            this.handleError(e);
          });
      } else {
        resolve(JSON.parse(localStorage.getItem(variable)));
      }
    });
  }

  public clearStorage() {
    if (this.plt.is('ios') || this.plt.is('android')) {
      this.nativeStorage.clear();
    } else {
      localStorage.clear();
    }
  }

  public removeStorage(key) {
    if (this.plt.is('ios') || this.plt.is('android')) {
      this.nativeStorage.remove(key);
    } else {
      localStorage.removeItem(key);
    }    
  }

  public setHeaders(auth_token: string) {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + auth_token
    })
  }

  public setHeadersdata(auth_token: string) {
    return new HttpHeaders({
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Bearer ' + auth_token
    })
  }

  public async createModal(params: object, page: any) {
    const modal = await this.modalController.create({
      component: page,
      componentProps: params
    });
    return await modal.present();
  }

  public async closeModal() {
    await this.modalController.dismiss();
  }

  public async presentAlertConfirm(title: string, message: string): Promise<boolean> {
    let resolveFunction: (confirm: boolean) => void;
    let promise = new Promise<boolean>(resolve => {
      resolveFunction = resolve;
    });
    this.alertConfirm = await this.alertController.create({
      header: title,
      message: message,
      buttons: [ {
        text: 'No',
        handler: () => resolveFunction(false)
      }, {
        text: 'Si',
        handler: () => resolveFunction(true)
      } ]
    });
    await this.alertConfirm.present();
    return promise;
  }

  public async presentAlertSimple(title: string, message: string) {
    this.alertSimple = await this.alertController.create({
      header: title,
      subHeader: message,      
      backdropDismiss: false
    });
    this.alertSimple.present(alert);
  }

  public async presentAlertButton(title: string, message: string) {
    this.alertSimple = await this.alertController.create({
      header: title,
      subHeader: message,      
      buttons: ['OK']
    });
    this.alertSimple.present(alert);
  }

  public currentDateTime() {
    let today = new Date();
    let min = today.getMinutes();
    let hour = today.getHours();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    return {today: today, yyyy: yyyy, mm:mm, dd:dd, hour:hour, min:min};
  }

  public formatDate(date) {
    if (this.plt.is('ios'))
      date = date.replace(/-/g, '/');
    return this.datePipe.transform(date, 'dd/MM/yyyy hh:mm a');
  }

  public createLinkDirection(lat, lng) {
    return "https://maps.google.com/?saddr=Current+Location&daddr="+lat+","+lng;
  }

  public call(number) {
    this.callNumber.callNumber(number, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  public getVersion() {
    return this.apiProv.get("getversion");
  }

  public updateApp() {

    if (this.plt.is('android') || this.plt.is('ios')) {
      //Version APK IPA
      this.appVersion.getVersionNumber().then( version => {
        this.currentVersion = version;
      });
      //Version API DB
      this.getVersion().subscribe(
        (data) => {          
        if(data.data[0].api_token != this.currentVersion) {
          this.presentAlertSimple('Nueva Versión ' + data.data[0].api_token, 
            'Hay una nueva versión disponible '+ data.data[0].api_token +
            ' actualiza a la nueva versión y disfruta de las mejoras.');
        }
      })                
    }
  }

  public getBlockUser(id) {
     this.apiProv.get("validateuserblock/" + id).subscribe(
      (data) => {          
      if(!data.success) {
        this.menuShow(false);
        this.clearStorage();
        this.presentToast("Usuario Bloqueado");
        this.router.navigateByUrl('/login');
      }
    })    
  }

  public numberWithFormat(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  /**
  * Handle server errors
  * @param error
  */
  private handleError(error): void {
    console.log(error);
  }


}  