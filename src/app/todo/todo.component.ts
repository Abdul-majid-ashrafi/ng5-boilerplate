import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { DataService } from '../data.service'

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  user: any;
  editTodo: boolean = false;
  todoID = ""

  itemsCollection: AngularFirestoreCollection<any>; //Item

  items: Observable<any[]>

  constructor(private afs: AngularFirestore, public routes: Router, public auth: DataService) {
    this.itemsCollection = afs.collection('items', ref => ref.orderBy("todo", 'desc'));

    this.items = this.itemsCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  addItem(todo: any) {
    this.itemsCollection.add({ todo: todo, createdAt: (new Date()).getTime() });
  }
  removeItemFromList(key: string) {
    this.itemsCollection.doc(key).delete().then(a => console.log('item deleted!'));
  }
  editFucntion(id) {
    this.todoID = id
    this.editTodo = true;
  }
  updateItem(updateTodo) {
    this.itemsCollection.doc(this.todoID).update({ todo: updateTodo, createdAt: (new Date()).getTime() });
    this.editTodo = false;
  }

  goToLoginForDemo() {
    this.routes.navigate(['login']);
  }


  ngOnInit() {
    this.auth.currentUser.subscribe(a => {
      this.user = a
      console.log(this.user)
    })
  }

}
