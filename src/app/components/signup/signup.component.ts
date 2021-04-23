import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MustMatch } from 'src/app/helpers/validation';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerForm!: FormGroup

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      cpassword: ['', Validators.required]
    },{
      validator: MustMatch('password', 'cpassword')
    });
  }

  get f() { return this.registerForm.controls; }

  openSnackBar(message: string) {
    this._snackBar.open(message, "Ok", {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  register() {

    if (this.registerForm.invalid) {
      this.openSnackBar("Fill out the form correctly")
      return;
    }
    
    this.userService.register(this.registerForm.value)
      .subscribe((res: any) => {
        if (res.message) {
          this.openSnackBar(res.message[0]);
          return;
        }
        this.router.navigate(['/login'])
      })
  }

}
