import { SongsService } from './../services/song.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.css']
})
export class AddSongComponent implements OnInit {

  constructor(private songsService: SongsService) { }

  thumbnail;
  songFile;


  ngOnInit(): void {
  }

  onSubmit(val) {
    const formData = new FormData();
    console.log(val);
    formData.append("title", val.value.title.trim().toLowerCase());
    formData.append("artistname", val.value.artistName.trim().toLowerCase());
    formData.append("thumbnail", this.thumbnail);
    formData.append("song", this.songFile);
    formData.append("collection", val.value.collection);
    formData.append("lan", val.value.lan.trim().toLowerCase());
    this.songsService.uploadSongs(formData);
  }

  song(e) {
    console.log(e);
    this.songFile = e.target.files[0];
  }

  img(e) {
    this.thumbnail = e.target.files[0];
  }

}
