import { UserService } from './../services/user.service';
import { SongsService } from './../services/song.service';
import { Component, OnInit } from "@angular/core";
import { BehaviorSubject, interval, Observable, timer } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-musicplayer',
  styleUrls: ['./musicplayer.component.css', './slidebar.css'],
  templateUrl: './musicplayer.component.html'
})

export class MusicPlayerComponent implements OnInit {
  constructor(private songsService: SongsService, private userService: UserService) { }
  songDetails;
  audio = new Audio();

  isShuffle = false;
  isRepeate = false;

  audioEvents = [
    "ended",
    "error",
    "play",
    "playing",
    "pause",
    "timeupdate",
    "canplay",
    "loadedmetadata",
    "loadstart"
  ];

  //state
  state = {
    playing: false,
    readableCurrentTime: '',
    readableDuration: '',
    duration: undefined,
    currentTime: undefined,
    volume: 0.5,
    canplay: false,
    error: false,
  };

  ngOnInit(): void {
    // display last played song
    this.userService.lastPlayedSong()
      .subscribe((result: any) => {
        this.songDetails = result.songDetails;
        this.audio.currentTime = result.currentTime;
        this.isRepeate = result.controls.isRepeat;
        this.isShuffle = result.controls.isShuffle;
        if (result.songDetails) {
          this.songsService.getSongCollection(result.songDetails.collectionName);
          this.streamObservable(this.songDetails.song).subscribe(result => {
          })
        }
        this.songsService.currentplayingSong(result.songDetails._id);
      })

    this.songsService.playSongListner()
      .subscribe((result: any) => {
        if (result._id != this.songDetails._id) {
          console.log(this.songDetails._id)
          this.songDetails = result;
          this.streamObservable(this.songDetails.song).subscribe(result => {
          })
          this.audio.play();
        }
        else {
          this.playPause();
        }
      });

    this.songsService.pauseListner().subscribe(result => {
      this.playPause();
    })
  }

  private stateChange: BehaviorSubject<any> = new BehaviorSubject(
    this.state
  );

  private updateStateEvents(event: Event): void {
    switch (event.type) {
      case "canplay":
        this.state.duration = this.audio.duration;
        this.state.readableDuration = this.timeFormat(this.state.duration);
        this.state.canplay = true;
        break;
      case "playing":
        this.state.playing = true;
        break;
      case "pause":
        this.state.playing = false;
        break;
      case "timeupdate":
        this.state.duration = this.audio.duration;
        this.state.currentTime = this.audio.currentTime;
        this.state.readableCurrentTime = this.timeFormat(
          this.state.currentTime
        );
        break;
      case "error":
        //this.resetState();
        // this.state.error = true;
        break;
      case "ended":
        console.log("ended");
        // this.audio.pause();
        this.nextSong(this.songDetails._id);
    }
    this.stateChange.next(this.state);
  }

  private streamObservable(url) {

    return new Observable(observer => {
      // Play audio
      this.audio.src = this.songDetails.song;
      this.audio.load();
      const handler = (event: Event) => {
        this.updateStateEvents(event);
        observer.next(event);
        //end song
        // if (this.currentTime === this.audio.duration) {
        //   // playe next
        //   this.isPlay = !this.isPlay;
        // }
      };

      this.addEvents(this.audio, this.audioEvents, handler);
      return () => {
        // Stop Playing
        this.audio.pause();

        // remove event listeners
        this.removeEvents(this.audio, this.audioEvents, handler);
        // reset state
        // this.resetState();
      };
    });
  }

  private addEvents(obj, events, handler) {
    events.forEach(event => {
      obj.addEventListener(event, handler);
    });
  }

  private removeEvents(obj, events, handler) {
    events.forEach(event => {
      obj.removeEventListener(event, handler);
    });
  }

  shuffle() {
    this.isShuffle = !this.isShuffle;
    const controls = {
      isShuffle: this.isShuffle,
      isRepeate: this.isRepeate,
    }
    this.userService.updateControls(controls).subscribe((result: any) => {
      if (result.done === true) {
      }
    })
  }

  repeate() {
    this.isRepeate = !this.isRepeate;
    const controls = {
      isShuffle: this.isShuffle,
      isRepeate: this.isRepeate,
    }
    this.userService.updateControls(controls).subscribe((result: any) => {

      if (result.done === true) {
      }
    })
  }

  playPause() {
    if (this.state.playing) {
      console.log("this.state")
      this.userService.updateLastPlaySong(this.songDetails._id, this.state.currentTime)
        .subscribe(result => {
          this.audio.pause();
          this.songsService.currentplayingSong(this.songDetails._id, false);
        })
    }
    else {
      this.audio.play();
      this.songsService.currentplayingSong(this.songDetails._id, true);
    }
  }

  nextSong(id) {
    this.songsService.nextSong(id, this.isRepeate, this.isShuffle);
  }

  backwordSong(id) {
    this.songsService.backSong(id, this.isRepeate, this.isShuffle);
  }

  oninput(e) {
    this.audio.currentTime = e.target.value;
    //this.audio.pause()
  }
  onChange(e) {
    //this.audio.play();
  }

  timeFormat(time, format = "mm:ss") {
    const momentTime = time * 1000;
    if (moment.utc(momentTime).format(format) === 'Invalid date' || moment.utc(momentTime).format(format) === undefined) {
      return;
    }
    else
      return moment.utc(momentTime).format(format);
  }
}