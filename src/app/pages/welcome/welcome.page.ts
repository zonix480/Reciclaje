import { Component, OnInit } from '@angular/core';
import {GlobalProvider} from '../../../providers/global';
import { UserProvider } from "../../../providers/users/users";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  public rol;
  public recyclings=[];
  constructor(private globalProv:GlobalProvider, private usersProv: UserProvider,) { }

  ngOnInit() {
    this.globalProv.getStorage("user").then(res => {
      this.rol = res.rols_id;   
    })
    this.getRecyclings();
  }



  getRecyclings() {
    this.globalProv.showLoader();    
        this.usersProv.setCallObservable('get', 'getrecycling', null).subscribe(
            (res) => {
              // Si respuesta true
              if(res.success) {
                for (var i = 0; i < res.data.length; i++) {           
                    this.recyclings.push({ 
                        id : res.data[i].id, 
                        state : res.data[i].state,
                        name: res.data[i].name,
                        lastname: res.data[i].lastname 
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
