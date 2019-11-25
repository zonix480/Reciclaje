import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';


import { DeleteRecPage } from './delete-rec.page';
const routes: Routes = [
  {
    path: '',
    component: DeleteRecPage
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DeleteRecPage]
})
export class DeleteRecPageModule {}
