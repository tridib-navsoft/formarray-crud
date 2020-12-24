import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signinForm: FormGroup;
  public loginData;
  public allUser;
  public isLoggedIn: boolean = false;
  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private router: Router,
    private appService: AppService) { }

  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  this.getAllData()
  }

  getAllData() {
    this.allUser = JSON.parse(localStorage.getItem('userInfo'));
     /* console.log('AAA'+this.allUser) */
  }

  public onSubmit = () => {

/*     username = this.signinForm.value.username */

    this.loginData = this.signinForm.value
    /* console.log(this.loginData.username) */

    this.allUser.map((user) => {
      if(user.username == this.loginData.username && user.password == this.loginData.password) {
        this.isLoggedIn = true
        this.toastr.success('User LoggedIn Successfully!', 'Success!')
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigate(['/all'])
      } else {
        /* this.toastr.error('No Such user Found!', 'Oops!') */
        return
      }
    })

/*     let result = this.allData.map((user)=>{
      return user
    })

    console.log('ZZZ'+result) */

   }

}
