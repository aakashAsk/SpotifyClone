import { SideBarComponent } from './side-bar/sidebar.component';
import { MusicPlayerComponent } from './music-player/musicplayer.component';
import { MainComponent } from './main-component/maincomponent.component';
import {MatSliderModule} from '@angular/material/slider';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddSongComponent } from './add-song/add-song.component';
import { FormsModule } from '@angular/forms';
import { HomepageComponent } from './homepage/homepage.component';
import { MusicCardComponent } from './common/music-card/music-card.component';
import { AlbumComponent } from './common/album/album.component';
import { NavBarComponent } from './common/nav-bar/nav-bar.component';
import { SignupComponent } from './common/signup/signup.component';
import { SigninComponent } from './common/signin/signin.component';
// angular.module('your.ng.app', ['chasselberg.slider']);

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MusicPlayerComponent,
    SideBarComponent,
    AddSongComponent,
    HomepageComponent,
    MusicCardComponent,
    AlbumComponent,
    NavBarComponent,
    SignupComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
