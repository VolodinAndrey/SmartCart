import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {

  protected readonly BASE = 'http://localhost:8000/';
  constructor() { }

}
