import { Component, OnInit } from '@angular/core';
import {GlobalProvider} from '../../../providers/global';
import { NavParams } from '@ionic/angular';
import { UserProvider} from "../../../providers/users/users";

@Component({
  selector: 'app-description',
  templateUrl: './description.page.html',
  styleUrls: ['./description.page.scss'],
})
export class DescriptionPage implements OnInit {
  public id;
  public size;
  public name;
  public materials=[];
  constructor(public globalProv:GlobalProvider, private navParams: NavParams,private usersProv: UserProvider,) { }

  ngOnInit() {
    this.id =this.navParams.data.id; 
    this.getMaterialsByid();
  }

  close(){
    this.globalProv.closeModal();
  }

  getMaterialsByid(){
    this.globalProv.showLoader();    
    this.usersProv.setCallObservable('get', 'getmaterials/'+this.id, null).subscribe(
        (res) => {
          // Si respuesta true
          if(res.success) {
            this.size=res.data[0].size;  
            this.name = res.data[0].name+" "+ res.data[0].lastname;  
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
