import { Component, OnInit } from '@angular/core';
import {  FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.model';
import { Message } from '../../shared/models/message.model';
import { AuthService } from '../../shared/services/auth.service';
import { fadeStateTrigger } from '../../shared/animations/fade.animation';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeStateTrigger]
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: Message;

  constructor(private usersService: UsersService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private title: Title,
              private meta: Meta,
              private fb: FormBuilder
  ) {
    title.setTitle('Enter system');
    meta.addTags([
      { name: 'keywords', content: 'Login, entrance, system' },
      { name: 'description', content: 'Starting page' }
    ]);
  }

  ngOnInit() {
    this.message = new Message('danger', '');

    this.route.queryParams
      .subscribe((params: Params) => {
        if (params['nowCanLogin']) {
          this.showMessage({
            text: 'You can log in now',
            type: 'success'
          });
        } else if (params['accessDenied']) {
          this.showMessage({
            text: 'To work with system you need login',
            type: 'warning'
          });
        }
      });

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  private showMessage(message: Message) {
    this.message = message;

    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  onSubmit() {
    const { email, password } = this.form.value;
    const formData = { email, password };

    this.usersService.getUserByEmail(formData)
      .subscribe((res: any) => {
        if (res.authToken) {
            this.message.text = '';
            const { authToken, ...userInfo} = res;
            window.localStorage.setItem('user', JSON.stringify(userInfo));
            window.localStorage.setItem('token', authToken);
            this.authService.login();

            this.router.navigate(['/system', 'bill']);
        } else {
          this.showMessage({
            text: res.errorMessage,
            type: 'danger'
          });
        }
      });
  }

}
