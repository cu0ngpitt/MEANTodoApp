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
  user: Object;

  lists: any;

  @Input() input;

  constructor(
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private listService: ListService
  ) { }

  ngOnInit() {
    this.getLists();

    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
    },
    err => {
      console.log(err);
      return false;
    });
  }

  getLists(): void {
    this.listService.getAllTodos()
      .subscribe((data: any) => this.lists = data.todos);
  }

  addList(newItem): void {
    const newTodo = { item: newItem, completed: false };

    if (newItem !== '')
      this.listService.addItem(newTodo).subscribe(data => {
          this.lists.push(data);
          this.getLists();
      });
    console.log(this.lists);
  }

  isChecked(list) {
    if(list.completed === false) {
      this.listService.markCompleted(list).subscribe((data: any) => {
        this.lists = data.todos;
        this.getLists();
        });
    } else if (list.completed === true) {
      this.listService.markNotCompleted(list).subscribe((data: any) => {
        this.lists = data.todos;
        this.getLists();
      });
    }
  }

  delList(list) {
    this.listService.deleteCompleted(list).subscribe((data: any) => {
      this.lists = data.todos;
      this.getLists();
    });
    }

}
