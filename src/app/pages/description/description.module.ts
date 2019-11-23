import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DescriptionPageRoutingModule } from './description-routing.module';
import {ComponentsModule} from '../../components/components.module';

import { DescriptionPage } from './description.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    DescriptionPageRoutingModule
  ],
  declarations: [DescriptionPage]
})
export class DescriptionPageModule {}
