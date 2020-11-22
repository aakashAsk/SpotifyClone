import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient) { }

  signup(form) {
    return this.http.post('http://localhost:3000/signup', form);
  }

  signin(form) {
    return this.http.post('signin', form);
  }

  updateLastPlaySong(songId, currentTime?) {
    const data = {
      id: localStorage.getItem('id'),
      songId,
      songTime: currentTime ? currentTime : 0
    }

    return this.http.post('http://localhost:3000/lastPlayedSong', data);
  }

  lastPlayedSong() {
    return this.http.get('http://localhost:3000/getLastPlayedSong/' + localStorage.getItem('id'));
  }

  updateControls(controls) {
    console.log(controls);
    const data = {
      controls,
      id: localStorage.getItem('id')
    }

    return this.http.put('http://localhost:3000/updateControls', data);

  }
}