import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  apiUrl = 'https://api.limantech.com/todo';

  constructor(
    // @Inject('apiUrl') private apiuRL               // app.module.ts içerisinde içerisinde ki url bilgisini almak için yazmamız gerekecek
    private http: HttpClient                // http servislerini kullanabilmemiz için HttpClient modülünü kullanmamız gerekiyor (app.module de import etmeyi unutma)
  ) { }

  /*
    Component dosyamızda addTodo methodumuzu yazıyoruz ve api'nin bizden istediği şekilde veriyi orada hazırlayıp servis
    dosyasında yazdığımız methoda bu veriyi parametre olarak gönderiyoruz. Servis dosyasındaki methodumuzda da HttpClientModule
    ile api adresine istek gönderip gelen sonucu component'e return ettiriyoruz
  */
  addTodo(obj) {
    return this.http.post(this.apiUrl + '/todo', obj);
  }

  getAllTodos() {
    return this.http.get(this.apiUrl + '/todo');
  }

  updateTodo(obj) {
    return this.http.put(this.apiUrl + '/todo', obj);
  }

  deleteTodo(id) {
    return this.http.delete(this.apiUrl + '/todo/' + id);
  }
}
