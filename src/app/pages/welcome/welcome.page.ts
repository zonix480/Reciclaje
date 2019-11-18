import { Component, OnInit } from '@angular/core';
import {GlobalProvider} from '../../../providers/global';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  public rol;
  constructor(private globalProv:GlobalProvider) { }

  ngOnInit() {
    this.globalProv.getStorage("user").then(res => {
      this.rol = res.rols_id;   
    })
  }

}
