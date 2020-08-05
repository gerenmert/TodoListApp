import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  data = {
    pendings: [
      'Get to work',
      'Pick up groceries',
      'Go home',
      'Fall asleep'
    ],

    inProgress: [
      'Get up',
      'Brush teeth',
      'Take a shower',
      'Check e-mail',
      'Walk dog'
    ],

    done: [
      'Get up',
      'Brush teeth',
      'Take a shower'
    ]
  }

  constructor() { }

  ngOnInit() {
    this.setItems();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {                            // maddeyi aynı liste içerisinde hareket ettirince
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {                                                                      // maddeyi farklı lsitelere taşıyınca
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
        Object.keys(this.data).forEach((key) => {                                                              
          localStorage.setItem(key, JSON.stringify(this.data[key]));              // listeler arası taşıma işlemi olduğunda localStorage'a listelerin yeni hallerini kaydeder
      });
    }
  }

  addTodo(todo) {
    this.data.pendings.push(todo.value);                                           // Eğer value demeseydik tüm input satırını eklerdi, sadece yazılan değeri değil
    localStorage.setItem('pendings', JSON.stringify(this.data.pendings));
    todo.value = '';
  }

  setItems() {
    Object.keys(this.data).forEach((key) => {                                     // data'nın içerisinde dön ve her elemanı (pendings, inProgress, done) key olarak ele al
      if (!localStorage.getItem(key)) {                                           // localStorage'da key değeri yok ise if'e gir
        localStorage.setItem(key, JSON.stringify(this.data[key]));                // data'nın içindeki elemanlardan key'e atanmış olanı stringify tipinde localStorage'a set et
      } else {                                                                    // localStorage'da key değeri var ise ise else'e gir
        this.data[key] = JSON.parse(localStorage.getItem(key));                   // data dizimizdeki key değerine atanan elemana localStorage'dan ilgili key değerini parse et
      }
    });
  }
}