import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TodoService } from 'src/app/services/todo.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  data = {};

  constructor(
    private todoService: TodoService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getAllTodos();               // sayfa yüklendiğinde todo'ları lsitelerde görebilmemiz için ngOnInit() içerisinde tanımlamamız gerekiyor
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {                            // maddeyi aynı liste içerisinde hareket ettirince
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {                                                                      // maddeyi farklı lsitelere taşıyınca
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    this.updateTodo();
  }

  addTodo(todo) {
    const obj = { todo: todo.value };                // api'nin istediği formatta veriyi hazırladık// gelen sonucu alabilmemiz için yani veri mi geliyor hata mı alıyoruz görebilmek için 
    this.todoService.addTodo(obj)
      .subscribe((res: any) => {                          // başarılı bir sonuç dönerse
        this.getAllTodos();
        todo.value = '';
        this.openSnackBar(res.message);
      }, (err) => {                                  // hata ile karşılaşırsak
        console.log(err);
      });
  }

  getAllTodos() {
    this.todoService.getAllTodos().subscribe((res) => {
        Object.keys(res).forEach((key) => {
          this.data[key] = res[key];
        });
      }, (err) => {
        console.log(err);
      });
  }
  
  updateTodo() {
    this.todoService.updateTodo(this.data).subscribe((res) => {
      this.getAllTodos();               // burada çağırmaz isek sürükleme işleminden sonra silmek isersek hata alırız
    }, (err) => {
      console.log(err);
    });
  }

  deleteTodo(id) {
    if(confirm('Are you sure you want to delete this item?')) {               // alert ile onay alma işlemi
      this.todoService.deleteTodo(id).subscribe((res) => {
        this.getAllTodos();
      }, (err) => {
        console.log(err);
      });
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'OK', {
      duration: 2000,
    });
  }
}