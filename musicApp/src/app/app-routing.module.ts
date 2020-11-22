import { SigninComponent } from './common/signin/signin.component';
import { SignupComponent } from './common/signup/signup.component';
import { AlbumComponent } from './common/album/album.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AddSongComponent } from './add-song/add-song.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'add-songs', component: AddSongComponent },
  { path: '', component: HomepageComponent },
  { path: 'album/:collectionName', component: AlbumComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
