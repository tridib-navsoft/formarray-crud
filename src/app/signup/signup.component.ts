import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  userList: any;

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private router: Router,
    private appService: AppService) { }

  ngOnInit(): void {

    this.getUserList()

    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{8,}$')]],
      dob: ['', [Validators.required]],
      qualification: this.formBuilder.array([]),
      terms: ['', [Validators.required]],
    })
  }

  addNewQualificationGroup() {
    const add = this.signupForm.get('qualification') as FormArray;
    add.push(this.formBuilder.group({
      passingYear: [],
      collegeName: [],
      percentage: []
    }))
  }

  public getUserList = () => {
    this.userList = JSON.parse(localStorage.getItem('userInfo'));
    /* console.log(this.userList) */
  }


  public onSubmit = () => {

    let oldValue = JSON.parse(localStorage.getItem('userInfo'));

    if(oldValue && oldValue.length > 0) {
      oldValue.push(this.signupForm.value)
      this.toastr.success('User Added Successfully!!', 'Success!!')
      this.router.navigate(['/login'])
    } else {
      const user = []
      user.push(this.signupForm.value)
      oldValue = user
    }

    localStorage.setItem('userInfo', JSON.stringify(oldValue));

    /* this.ngOnInit() */

}

}





