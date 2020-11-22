import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class SongsService {
  constructor(private http: HttpClient, private us: UserService) { }
  SongCollection;

  song = new Subject();
  plyp = new Subject();
  currentPlayingSong = new Subject();
  currentSongId;
  status;

  uploadSongs(details) {
    this.http.post('http://localhost:3000/song', details)
      .subscribe(result => {
      });
  }

  getSongByLang(lan) {
    return this.http.get('http://localhost:3000/getSongByLan/' + lan)
  }

  playSong(id, isplaying?) {
    this.getSongById(id)
      .subscribe((result: any) => {
        const newResult = {
          ...result,
          isplaying
        }
        this.song.next(newResult);
      })
  }
  playSongListner() {
    return this.song.asObservable();
  }

  pause(play) {
    this.plyp.next(play);
  }
  pauseListner() {
    return this.plyp.asObservable();
  }


  getSongById(id) {
    return this.http.get('http://localhost:3000/getSongById/' + id);
  }


  getSongCollection(collection) {
    // this.SongCollection = [];
    this.getCollection(collection)
      .subscribe(result => {
        this.SongCollection = result;
      })
  }

  getCollection(collection) {
    return this.http.get('http://localhost:3000/getSongCollection/' + collection)
  }

  nextSong(findId, isRepeat, isShuffle) {
    //console.log(this.SongCollection);
    const index = this.SongCollection.findIndex(id => id._id === findId);

    if (isShuffle) {
      let randomIndex = this.randomIndex();
      if (randomIndex != index) {
        this.song.next(this.SongCollection[randomIndex]);
        this.currentplayingSong(this.SongCollection[randomIndex]._id, true)

        this.updateStatus(randomIndex);
      }
      else {
        randomIndex = this.randomIndex();
      }
    }
    else {
      if (this.SongCollection.length - 1 != index) {
        this.song.next(this.SongCollection[index + 1]);
        this.currentplayingSong(this.SongCollection[index + 1]._id, true)
        this.updateStatus(index + 1)
      }
      else {
        if (isRepeat) {
          this.song.next(this.SongCollection[0]);
          this.currentplayingSong(this.SongCollection[0]._id, true)
          this.updateStatus(0);
        }
      }
    }

  }

  backSong(findId, isRepeat, isShuffle) {
    const index = this.SongCollection.findIndex(id => id._id === findId);
    if (isShuffle) {
      let randomIndex = this.randomIndex();
      if (randomIndex != index) {
        this.song.next(this.SongCollection[randomIndex]);
        this.currentplayingSong(this.SongCollection[randomIndex], true);
        this.updateStatus(randomIndex);
      }
      else {
        randomIndex = this.randomIndex();
      }
    }
    else {
      if (index === 0) {
        if (isRepeat) {
          this.song.next(this.SongCollection[this.SongCollection.length - 1]);
          this.currentplayingSong(this.SongCollection[this.SongCollection.length - 1], true);
          this.updateStatus(this.SongCollection.length - 1);
        }
      }
      else {
        this.song.next(this.SongCollection[index - 1]);
        this.currentplayingSong(this.SongCollection[index - 1], true);
        this.updateStatus(index - 1);
      }
    }
  }

  randomIndex() {
    return Math.floor(Math.random() * this.SongCollection.length);
  }

  updateStatus(index) {
    this.us.updateLastPlaySong(
      this.SongCollection[index]._id)
      .subscribe(result => {
        console.log(result)
      })
  }

  currentplayingSong(id, status?) {
    const data = {
      id, status
    }
    this.currentSongId = id;
    if (status)
      this.status = true
    this.currentPlayingSong.next(data);
  }

  currentPlayingSongListner() {
    return this.currentPlayingSong.asObservable();
  }




}