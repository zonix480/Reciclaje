import { Component, OnInit } from '@angular/core';
import {GlobalProvider} from '../../../providers/global';
import { UserProvider } from "../../../providers/users/users";
import {DescriptionPage} from '../description/description.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-rec',
  templateUrl: './delete-rec.page.html',
  styleUrls: ['./delete-rec.page.scss'],
})
export class DeleteRecPage implements OnInit {

  constructor(private globalProv:GlobalProvider, private usersProv: UserProvider, public router:Router) { }

  ngOnInit() {
  }
  public recyclings=[];
  public rol;
  public idUser;

  doRefresh(event) {
    console.log('Begin async operation');
    this.recyclings=[];
    setTimeout(() => {
      this.globalProv.getStorage("user").then(res => {
        this.rol = res.rols_id;   
      })
      if(this.rol != 1){
        this.getRecyclings();
      }
      event.target.complete();
    }, 2000);
  }


  
  ionViewDidEnter(){
    console.log("oninit");
    this.recyclings=[];
    setTimeout(() => {
      this.globalProv.getStorage("user").then(res => {
        this.rol = res.rols_id;   
        this.idUser = res.id;
      })
      if(this.rol != 1){
        this.getRecyclings();
      }
    }, 2000);
  }

  getRecyclings() {
    this.globalProv.showLoader();    
    this.globalProv.getStorage("user").then(res => {
        this.usersProv.setCallObservable('get', 'getrecyclingbyuser/'+res.id, null).subscribe(
            (res) => {
              // Si respuesta true
              if(res.success) {
                for (var i = 0; i < res.data.length; i++) {           
                    this.recyclings.push({ 
                        id : res.data[i].id, 
                        state : res.data[i].state,
                        date:res.data[i].date,
                        lat : res.data[i].lat,
                        lng : res.data[i].lng,
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
      });
    }



    cancel(id){
      let request = {
        id_user: this.idUser,
        id_recycling: id
      }
      this.globalProv.showLoader();
      this.usersProv.setCallPromise('post', request, 'cancelrecycling', null).then(res => {  
        this.globalProv.hideLoader();     
        if(!res.success) {
          this.globalProv.presentToast(res.message);
        }else if(res.success) {
          this.globalProv.presentToast("Cancelado Correctamente");
          this.router.navigateByUrl('/welcome');
        }
      }); 
      
    }

}
