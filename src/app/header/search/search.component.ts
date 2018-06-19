import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initSearchForm();
  }
  initSearchForm() {
    this.searchForm = this.fb.group({
      search: [''],
    });
  }
  onSearch() {
    console.log('search');
  }

}
