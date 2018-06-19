import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router, ActivatedRoute} from '@angular/router';
import {UserService} from './services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private http: HttpClient, private fb: FormBuilder, private ar: ActivatedRoute,
    private router: Router, private users: UserService) {}

  ngOnInit() {
    this.initForm();
    this.ar.queryParams.subscribe(c => {
      console.log(c);
      if (c.url) {
        const token = localStorage.getItem('token');
        console.log(token);
        this.http.post('http://88.81.237.101:8000/api/token-refresh/', {token: token}).subscribe((t: any) => {
          console.log(t);
          localStorage.setItem('token', t.token);
        });
      }
    });
  }
  private initForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  public onSubmit() {
    this.http.post('http://88.81.237.101:8000/api/user/registration/', this.loginForm.value).subscribe(c => {
      localStorage.setItem('user', JSON.stringify(c));
    }, error => {
      this.http.post('http://88.81.237.101:8000/api/token-auth/', this.loginForm.value).subscribe((c: any) => {
        localStorage.setItem('token', c.token);
      }, null, () => {
        const headers = new HttpHeaders().set('Authorization', `JWT ${localStorage.getItem('token')}`);
        this.http.get('http://88.81.237.101:8000/api/user/', {headers}).subscribe((s: any) => {
          console.log(s);
          this.users.next(s);
        });
        this.router.navigate(['/']);
      });
    }, () => {
      this.http.post('http://88.81.237.101:8000/api/token-auth/', this.loginForm.value).subscribe((c: any) => {
        localStorage.setItem('token', c.token);
      }, null, () => {
        const headers = new HttpHeaders().set('Authorization', `JWT ${localStorage.getItem('token')}`);
        this.http.get('http://88.81.237.101:8000/api/user/', {headers}).subscribe((s: any) => {
          console.log(s);
          this.users.next(s);
        });
        this.router.navigate(['/']);
      });
    });
  }
}
