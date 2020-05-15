import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(){var firebaseConfig = {
    apiKey: "AIzaSyD2Ricm79isa3w_DqCPgsDHdbVDj_ZAQ7A",
    authDomain: "tarek-203413.firebaseapp.com",
    databaseURL: "https://tarek-203413.firebaseio.com",
    projectId: "tarek-203413",
    storageBucket: "tarek-203413.appspot.com",
    messagingSenderId: "730511530066",
    appId: "1:730511530066:web:3a589d715a19a8d9fd278b",
    measurementId: "G-HMF1TR0XR1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  }
}
