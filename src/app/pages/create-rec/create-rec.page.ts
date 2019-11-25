import { Component, OnInit } from '@angular/core';
import {GlobalProvider} from '../../../providers/global';
import { UserProvider} from "../../../providers/users/users";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-create-rec',
  templateUrl: './create-rec.page.html',
  styleUrls: ['./create-rec.page.scss'],
})
export class CreateRecPage implements OnInit {
  public createForm: FormGroup;
  public materials=[];
  public lat;
  public long;
  constructor(public globalProv: GlobalProvider,
    private geolocation: Geolocation,
    private usersProv: UserProvider,
    public formBuilder: FormBuilder,
    public router: Router) {
      this.createForm = formBuilder.group({
        date: ['', Validators.required],
        materials: [''],
        size: ['', Validators.required],
    });
    }

  ngOnInit() {
    this.getMaterials();
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat=resp.coords.latitude;
      this.long=resp.coords.longitude;
     }).catch((error) => {
       this.globalProv.presentToast("Ocurrio un error debido a permisos");
     });
  }

  create(){
    if(this.createForm.valid){
      this.globalProv.getStorage('user').then((res)=>{
        this.globalProv.showLoader();
        let request = {
                date: this.createForm.value.date,
                id_user: res.id,
                materials: this.createForm.value.materials,
                size: this.createForm.value.size,
                lat: this.lat,
                lng: this.long
            };
        //call provider API
        this.usersProv.setCallPromise('post', request, 'createrecycling', null).then(res => {  
          this.globalProv.hideLoader();     
          if(!res.success) {
            this.globalProv.presentToast(res.message);
          }else if(res.success) {
            this.globalProv.presentToast("Agendado Correctamente");
            this.router.navigateByUrl('/welcome');
          }
        });    
      })
    }else{
      console.log("Ingrese toda la información");
    }
  }



  getMaterials() {
    this.globalProv.showLoader();    
        this.usersProv.setCallObservable('get', 'materials', null).subscribe(
            (res) => {
              // Si respuesta true
              if(res.success) {
                for (var i = 0; i < res.data.length; i++) {           
                    this.materials.push({ 
                        id : Number(res.data[i].id), 
                        material : res.data[i].material,
                      }) 
                }  
                this.globalProv.hideLoader();
              }else{
                this.globalProv.hideLoader();
                this.globalProv.presentToast(res.message);
              }
            }
        )
    }

}
