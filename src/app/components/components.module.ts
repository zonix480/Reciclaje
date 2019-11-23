import { NgModule } from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {GoogleMapComponent} from './google-map/google-map.component';


@NgModule({
  declarations: [
    GoogleMapComponent
  ],
  imports: [
    IonicModule
  ],
  exports: [
    GoogleMapComponent
  ]
})
export class ComponentsModule { }
