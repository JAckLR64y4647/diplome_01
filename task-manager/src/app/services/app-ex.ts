import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ex',
  template: '',
  styles: []
})
export class ExComponent implements OnInit {
  data: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('https://r9j9iupnri.execute-api.eu-north-1.amazonaws.com/prod/ex')
      .subscribe(response => {
        this.data = response;
        console.log(this.data);
      }, error => {
        console.error('Error:', error);
      });
  }
}
