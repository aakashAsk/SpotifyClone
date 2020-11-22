import { SongsService } from './../../services/song.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  songCollection = [];
  isPlaying = false;
  play = false;
  currentSongId;
  img;
  songname;
  artistname;

  constructor(private activatedRoute: ActivatedRoute, private songService: SongsService) { }

  ngOnInit(): void {
    this.currentSongId = this.songService.currentSongId;
    console.log(this.songService.status)
    if (this.songCollection.find(a => a._id === this.currentSongId)) {
      if (this.songService.status) {
        console.log(true)
        this.isPlaying = true;
      }
      else
        this.isPlaying = false
      this.play = true;
    }


    this.songService.getCollection(this.activatedRoute.snapshot.paramMap.get('collectionName'))
      .subscribe((result: any) => {
        this.songCollection = result;
        this.img = this.songCollection[0].img
        this.artistname = this.songCollection[0].artistName
        this.songname = this.songCollection[0].title
      });

    this.songService.currentPlayingSongListner()
      .subscribe((result: any) => {
        console.log(result);
        this.currentSongId = result.id;
        if (this.songCollection.find(a => a._id === this.currentSongId)) {
          if (result.status)
            this.isPlaying = true;
          else
            this.isPlaying = false
          this.play = true;
        }
      })
  }

  playpasuse() {
    this.isPlaying = !this.isPlaying;
    if (!this.play) {
      this.currentSongId = this.songCollection[0]._id;
      this.songService.playSong(this.songCollection[0]._id, this.isPlaying);
      this.play = true;
    }
    else {
      this.songService.pause(this.isPlaying);
      //this.songService.playSong(this.songCollection[0]._id, this.isPlaying);

    }
  }

}
