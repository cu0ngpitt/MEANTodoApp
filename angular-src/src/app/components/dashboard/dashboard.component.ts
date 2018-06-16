import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ListService } from '../../services/list.service';
//import { List } from '../../list';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any;
  username: any;
  userId: string;

  lists: any;

  @Input() input;


  constructor(
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private listService: ListService
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
      this.username = profile.user.username;
      this.getLists();
    },
    err => {
      console.log(err);
      return false;
    });
  }


  getLists(): void {
    const username = { username: this.username };
    this.listService.getAllTodos(username).subscribe((data: any) => {
      this.lists = data.data.todos;
      this.userId = data.data._id;
      console.log(this.lists);
    });
  }

  addList(newItem): void {
    const newTodo = { username: this.user.username, todos: [{item: newItem, completed: false}] };

    if (newItem !== '')
      this.listService.addItem(newTodo).subscribe(data => {
          this.lists.push(data);
          this.getLists();
      });
  }

  isChecked(list) {
    const info = {userId: this.userId, list: [list]}
    if(list.completed === false) {
      this.listService.markCompleted(info).subscribe((data: any) => {
        this.lists = data.todos;
        this.getLists();
        console.log(this.lists);
        });
    } else if (list.completed === true) {
      this.listService.markNotCompleted(info).subscribe((data: any) => {
        this.lists = data.todos;
        this.getLists();
      });
    }
  }

  delList() {
    const info = {userId: this.userId, list: [this.lists]}
    this.listService.deleteCompleted(info).subscribe((data: any) => {
      this.lists = data.todos;
      this.getLists();
    });
    }

}
