import { Component, OnInit } from '@angular/core';
import { GlobalProvider } from './../../../providers/global';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserProvider} from "../../../providers/users/users";
import { Router } from '@angular/router';

@Component({
  selector: 'app-data',
  templateUrl: './data.page.html',
  styleUrls: ['./data.page.scss'],
})
export class DataPage implements OnInit {
  public updateForm: FormGroup;
  constructor(public globalProv:GlobalProvider, public formBuilder: FormBuilder,private usersProv: UserProvider,public router: Router) {
    this.updateForm = formBuilder.group({
      name: ['', Validators.compose([Validators.maxLength(60), Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ\s ]*'), Validators.required])],
      lastname: ['', Validators.compose([Validators.maxLength(60), Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ\s ]*'), Validators.required])],
      phone: ['', Validators.compose([Validators.maxLength(10), Validators.pattern('[0-9]+'), Validators.required])],
      email: ['', Validators.compose([Validators.maxLength(120), Validators.email, Validators.required])],
      stratum: ['', Validators.required],
      identity_number: ['', Validators.compose([Validators.maxLength(10), Validators.pattern('[0-9]+'), Validators.required])],
    });
  }
  public id;
  public name;
  public lastname;
  public phone;
  public rol;
  public identity_number;
  public email;
  public stratum;
  
  ngOnInit() {
    this.globalProv.getStorage("user").then((res)=>{
      this.id = res.id;
      this.name = res.name;
      this.lastname = res.lastname;
      this.phone = res.phone;
      this.identity_number = res.identity_number;
      this.email = res.email;
      this.rol = res.rols_id;
      this.stratum = res.stratum;
    })
  }

  updatedata(){
    console.log(this.updateForm.valid);
    if(this.updateForm.valid){
    let request = {
      id: this.id,
      name: this.updateForm.value.name,
      lastname: this.updateForm.value.lastname,
      phone: this.updateForm.value.phone,
      stratum: this.updateForm.value.stratum,
      identity_number: this.updateForm.value.identity_number
      }
      this.usersProv.setCallPromise('post', request, 'updatedata', null).then(res => {  
        this.globalProv.hideLoader();     
        if(!res.success) {
          this.globalProv.presentToast(res.message);
        }else if(res.success) {
          this.globalProv.presentToast("Datos actualizados");
          this.globalProv.setStorage('user', {
            id: this.id,
            name: this.updateForm.value.name,
            lastname: this.updateForm.value.lastname,
            email:this.updateForm.value.email,
            phone: this.updateForm.value.phone,
            rols_id: this.rol,
            stratum:this.updateForm.value.stratum,
            identity_number: this.updateForm.value.identity_number,
          });
          this.router.navigateByUrl('/home');
        }
      });
    }else{
      this.globalProv.presentToast("completa todo el formulario");
    }
  }



}
