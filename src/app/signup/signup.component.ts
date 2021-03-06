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
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{8,}$')]],
      dob: ['', [Validators.required]],
      qualification: this.formBuilder.array([]),
      terms: ['', [Validators.required]],
    })

    this.getUserList()
  }

  getArray(): FormArray {

    return this.signupForm.get("qualification") as FormArray

  }

  pushArray(): FormGroup {

    return this.formBuilder.group({
      passingYear: '',
      collegeName: '',
      percentage: ''
    })

  }

  addNewQualification() {

    this.getArray().push(this.pushArray());

  }

  removeQualification(i: number) {

    this.getArray().removeAt(i);

  }

  /*   addNewQualificationGroup() {
     const add = this.signupForm.get('qualification') as FormArray;
      add.push(this.formBuilder.group({
        passingYear: [],
        collegeName: [],
        percentage: []
      }))
    } */

  public getUserList = () => {
    this.userList = JSON.parse(localStorage.getItem('userInfo'));
  }


  public onSubmit = () => {

    const addUser = JSON.parse(localStorage.getItem('userInfo'));

    if (addUser && addUser.length > 0) {
      addUser.push(this.signupForm.value)
      this.toastr.success('User Added Successfully!!', 'Success!!')
      localStorage.setItem('userInfo', JSON.stringify(addUser));
      this.router.navigate(['/login'])
    } else {
      const user = []
      user.push(this.signupForm.value)
      this.userList = user
      this.toastr.success('User Added Successfully!!', 'Success!!')
      localStorage.setItem('userInfo', JSON.stringify(this.userList));
      this.router.navigate(['/login'])
    }



    //this.ngOnInit()

  }

}





