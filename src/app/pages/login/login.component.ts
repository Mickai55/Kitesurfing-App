import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from 'src/app/services/api-services/main.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public serverError: boolean = false;
  public submitted: boolean = false;
  loading = false;

  constructor(private formBuilder: FormBuilder,
    private mainService: MainService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  doLogin() {
    console.log(this.loginForm);
    this.submitted = true;
    this.serverError = false;
    this.loading = true;

    if (this.loginForm.status === 'VALID') {
      this.mainService.login(this.loginForm.value).subscribe(
        (res) => {this.loading = false;},
        (err) => {
          if (err) {
            this.serverError = true;
            this.loading = false;
          }
        }
      );
    }
  }

  get f() {
    return this.loginForm.controls;
  }

}
