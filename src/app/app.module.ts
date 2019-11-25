import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DatePipe } from '@angular/common';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { GlobalProvider } from '../providers/global';
import { ApiProvider } from "../providers/api";
import { AppVersion } from '@ionic-native/app-version/ngx';
import { DescriptionPageModule } from './pages/description/description.module';
import {ComponentsModule} from './components/components.module';
import { UserProvider } from '../providers/users/users';
import { Geolocation } from '@ionic-native/geolocation/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), ComponentsModule, AppRoutingModule, HttpClientModule, DescriptionPageModule, ],
  providers: [
    UserProvider,
    StatusBar,
    Geolocation,
    SplashScreen,
    GlobalProvider,
    ApiProvider,
    NativeStorage,
    DatePipe,
    CallNumber,
    AppVersion,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
