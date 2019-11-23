import { Component, OnInit } from '@angular/core';
import { GlobalProvider } from './../../../providers/global';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-data',
  templateUrl: './data.page.html',
  styleUrls: ['./data.page.scss'],
})
export class DataPage implements OnInit {
  public updateForm: FormGroup;
  constructor(public globalProv:GlobalProvider, public formBuilder: FormBuilder,) {
    this.updateForm = formBuilder.group({
      name: ['', Validators.compose([Validators.maxLength(60), Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ\s ]*'), Validators.required])],
      lastname: ['', Validators.compose([Validators.maxLength(60), Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ\s ]*'), Validators.required])],
      phone: ['', Validators.compose([Validators.maxLength(10), Validators.pattern('[0-9]+'), Validators.required])],
      email: ['', Validators.compose([Validators.maxLength(120), Validators.email, Validators.required])],
      stratum: ['', Validators.required],
      identity_number: ['', Validators.compose([Validators.maxLength(10), Validators.pattern('[0-9]+'), Validators.required])],
      password: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(12), Validators.required])],
    });
  }
  public name;
  public lastname;
  public phone;
  public identity_number;
  public email;
  public stratum;
  
  ngOnInit() {
    this.globalProv.getStorage("user").then((res)=>{
      this.name = res.name;
      this.lastname = res.lastname;
      this.phone = res.phone;
      this.identity_number = res.identity_number;
      this.email = res.email;
      this.stratum = res.stratum;
    })
  }



}
