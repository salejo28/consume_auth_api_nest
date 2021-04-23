import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  
  loginForm!: FormGroup;

  constructor(
    public userService: UserService, 
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router
    ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  get f() { return this.loginForm.controls; }

  openSnackBar(message: string) {
    this._snackBar.open(message, "Ok", {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.openSnackBar("Fill out the form correctly")
      return;
    }

    this.userService.login(this.loginForm.value)
      .subscribe((res: any) => {
        if (res.message) {
          this.openSnackBar(res.message[0]);
          return;
        }

        localStorage.setItem('token', res.access_token);
        this.router.navigate(['/products'])
      })
  }

}
