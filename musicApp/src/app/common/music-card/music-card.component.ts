import { UserService } from './../../services/user.service';
import { SongsService } from './../../services/song.service';
import { Router } from '@angular/router';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-music-card',
  templateUrl: './music-card.component.html',
  styleUrls: ['./music-card.component.css']
})
export class MusicCardComponent implements OnInit, OnChanges {
  @Input() songList;
  @Input() songUrl;

  song;
  isPlay = false;
  currentSongId;
  currentPlay = false;
  constructor(private route: Router, private songsService: SongsService, private userService: UserService) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.song = this.songList;
  }

  ngOnInit(): void {
    this.currentSongId = this.songsService.currentSongId;
    this.currentPlay = this.songsService.status;
    console.log(this.songsService.status)
    this.songsService.currentPlayingSongListner()
      .subscribe((result: any) => {
        this.currentSongId = result.id;
        if (result.status === true)
          this.isPlay = result.status;
        else if (result.status === false)
          this.isPlay = result.status;
      });
  }

  play(id) {
    if (!this.isPlay) {
      this.songsService.playSong(id);
      this.userService.updateLastPlaySong(id)
        .subscribe(result => {
        })
      this.songsService.getSongCollection(this.song.collection);
      this.songsService.currentplayingSong(id, this.isPlay);
      this.isPlay = !this.isPlay;
    }
    else {
      this.isPlay = !this.isPlay;
      this.songsService.pause(this.play);
    }
  }

  navigate(collctionName) {
    this.route.navigateByUrl('/album/' + collctionName);
  }
}
