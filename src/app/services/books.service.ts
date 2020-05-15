import { Injectable } from '@angular/core';
import { Book } from '../models/Book.model';
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase';
import Datasnapshot = firebase.database.DataSnapshot;
import { HttpClientModule } from '@angular/common/http';
//import {DataSnapshot} from 'firebase.database.DataSnapshot';


@Injectable({
  providedIn: 'root'
})

export class BooksService {

  books: Book[]=[] ;
  booksSubject = new Subject<Book[]>();

  constructor(private httpClientModule : HttpClientModule) { }
// pour emttre les Subject
  emitBooks(){
    this.booksSubject.next(this.books);
  }
// enregistre les Livres dans la base de donnee
// set comme put en php
  saveBooks(){
    firebase.database().ref('/books').set(this.books);
  }

  //recupere la liste de Livres
  //on pour reagir a de modification de bas de donnee
  getBooks() {
    firebase.database().ref('/books')
      .on('value', (data: Datasnapshot) => {
          this.books = data.val() ? data.val() : [];
          this.emitBooks();
        }
      );
  }
  // retourner un seul Livre de base de donnee
  getSingleBook(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/books/' + id).once('value').then(
          (data: Datasnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }
  createNewBook(newBook: Book) {
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks();
  }

  removeBook(book: Book) {
    const bookIndexToRemove = this.books.findIndex(
      (bookEl) => {
        if(bookEl === book) {
          return true;
        }
      }
    );
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitBooks();
  }
  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement…');
          },
          (error) => {
            console.log('Erreur de chargement ! : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
}
//saveBooksToServer(){
  //this.httpClientModule.put('https://tarek-203413.firebaseio.com/Book.json');

//}
}
