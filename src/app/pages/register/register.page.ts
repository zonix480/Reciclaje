import { Component, OnInit } from '@angular/core';
import {GlobalProvider} from '../../../providers/global';
import { UserProvider} from "../../../providers/users/users";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public registerForm: FormGroup;
  constructor(
    public globalProv: GlobalProvider,
    private usersProv: UserProvider,
    public formBuilder: FormBuilder,
    public router: Router) {
      this.registerForm = formBuilder.group({
        name: ['', Validators.compose([Validators.maxLength(60), Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ\s ]*'), Validators.required])],
        lastname: ['', Validators.compose([Validators.maxLength(60), Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ\s ]*'), Validators.required])],
        identity_number: ['', Validators.compose([Validators.maxLength(10),Validators.pattern('[0-9]*'), Validators.required])],
        address: ['', Validators.compose([Validators.maxLength(60), Validators.required])],
        stratum: ['', Validators.required],
        rols_id: ['', Validators.required],
        phone: ['', Validators.compose([Validators.maxLength(10),Validators.pattern('[0-9]*'), Validators.required])],
        email: ['', Validators.compose([Validators.maxLength(120), Validators.email, Validators.required])],
        password: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(12), Validators.required])],
        password2: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(12), Validators.required])]
    });
     }

  ngOnInit() {
  }


  /**
   * Method registerusers
   */
  registeruser() {
    //validate form
    if(this.registerForm.valid) {
      if(this.registerForm.controls.password.value != this.registerForm.controls.password2.value) { 
        this.globalProv.presentToast("Las contraseñas no coinciden");
      }else{
        this.globalProv.showLoader();
      	let request = {
    				    name: this.registerForm.value.name,
    				    lastname: this.registerForm.value.lastname,
    				    identity: String(this.registerForm.value.identity_number),
    				    address: this.registerForm.value.address,
    				    stratum: this.registerForm.value.stratum,
    				    rols_id: this.registerForm.value.rols_id,
    				    phone: this.registerForm.value.phone,
    				    email: this.registerForm.value.email,
    				    password: this.registerForm.value.password,
    				};
        //call provider API
        this.usersProv.setCallPromise('post', request, 'registeruser', null).then(res => {  
            this.globalProv.hideLoader();     
            if(!res.success) {
              this.globalProv.presentToast(res.message);
            }else if(res.success) {
              this.globalProv.presentToast("Ya puedes iniciar sesión");
              this.router.navigateByUrl('/home');
            }
          });
      }

    }else{
        this.globalProv.presentToast("Verifica que todos los campos esten correctos");
    }

  }

}
