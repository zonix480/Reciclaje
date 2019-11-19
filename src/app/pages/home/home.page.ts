import { Component } from '@angular/core';
import { GlobalProvider } from '../../../providers/global';
import { UserProvider } from "../../../providers/users/users";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public loginForm: FormGroup;
  
  constructor(private globalProv:GlobalProvider,
    private usersProv: UserProvider,
    public formBuilder: FormBuilder,
    public router: Router) {
      this.loginForm = formBuilder.group({
        email: ['', Validators.compose([Validators.maxLength(120), Validators.email, Validators.required])],
        password: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(12), Validators.required])]
      });
    }

  ngOnInit() {
    this.globalProv.getStorage('user').then((res)=>{
      if(res){
        this.router.navigateByUrl("welcome")
      }else{
        console.log("No ha iniciado sesión");
      }
    })
  }



    /**
   * Method registerusers
   */
  loginuser() {    
    //validate form
    if (this.loginForm.valid) {
      this.globalProv.showLoader();
      let request = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };
      //call provider API
      this.usersProv.setCallPromise('post', request, 'loginuser', null).then(res => {
        this.globalProv.hideLoader();
        if (!res.success) {
          //Si error
          this.globalProv.presentToast(res.message);
        } else if (res.success) {
          //Login     
          this.globalProv.setStorage('user', {
            id: res.data[0].id,
            name: res.data[0].name,
            lastname: res.data[0].lastname,
            email: res.data[0].email,
            phone: res.data[0].phone,
            rols_id: res.data[0].rols_id,
            stratum: res.data[0].stratum,
            identity_number: res.data[0].identity_number,
          });       
          this.router.navigateByUrl('welcome')
        }
      });
    } else {
      this.globalProv.presentToast("Ingresa tu correo y contraseña");
    }

  }
  
}
