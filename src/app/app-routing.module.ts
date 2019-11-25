import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)},
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'welcome', loadChildren: './pages/welcome/welcome.module#WelcomePageModule' },
  { path: 'description', loadChildren: './pages/description/description.module#DescriptionPageModule' },
  { path: 'welcome/data', loadChildren: './pages/data/data.module#DataPageModule' },
  { path: 'welcome/create-rec', loadChildren: './pages/create-rec/create-rec.module#CreateRecPageModule' },
  { path: 'welcome/delete-rec', loadChildren: './pages/delete-rec/delete-rec.module#DeleteRecPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
