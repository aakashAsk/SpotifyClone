import { SongsService } from './../services/song.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private songsService: SongsService) { }
  hindiSongList;
  englishSongList;
  ngOnInit(): void {
    this.songsService.getSongByLang('hindi')
      .subscribe(result => {
        this.hindiSongList = result;
      });

    this.songsService.getSongByLang('english')
      .subscribe(result => {
        this.englishSongList = result;
      });
  }

}
