import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public categories: any = [];
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('http://88.81.237.101:8000/api/category/').subscribe((c: any) => {
      console.log(c);
      this.categories = c.results;
    });
  }

}
