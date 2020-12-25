import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.css']
})
export class AllUserComponent implements OnInit {

  editForm: FormGroup
  //public currentUser;
  userList: any;

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private router: Router,
    private appService: AppService) { }

  ngOnInit(): void {
    //this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.editForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      username: [''],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{8,}$')]],
      dob: ['', [Validators.required]],
      qualification: this.formBuilder.array([]),
      terms: ['', [Validators.required]],
    })

    this.getUserList()
  }

  getArray(): FormArray {

    return this.editForm.get("qualification") as FormArray

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

  /*   get formArr() {
      return this.editForm.get('qualification') as FormArray;
    } */

  public onClick = (user) => {
    //const arr = this.editForm.get('qualification') as FormArray;
    this.editForm.patchValue({
      name: user.name,
      email: user.email,
      username: user.username,
      password: user.password,
      dob: user.dob,
      qualification: user.qualification.forEach(element => {
        this.getArray().push(this.formBuilder.group(element))
      }),
      terms: user.terms

    })
  }

  public getUserList = () => {
    this.userList = JSON.parse(localStorage.getItem('userInfo'));
    /* console.log(this.userList) */
  }

  /*   addNewQualificationGroup() {
      const add = this.editForm.get('qualification') as FormArray;
      add.push(this.formBuilder.group({
        passingYear: [],
        collegeName: [],
        percentage: []
      }))
    } */

  onSubmit() {

    let data = this.editForm.value
    //let allUserList = JSON.parse(localStorage.getItem('userInfo'));
    this.userList.forEach((user) => {
      console.log('user_check' + user)

      if (data.username == user.username) {
        //user = data;
        user.name = data.name;
        user.email = data.email;
        user.password = data.password;
        user.dob = data.dob;
        user.name = data.name;
        user.qualification = data.qualification;

        this.toastr.success('Successfully Edited user details', 'Success!!')
      }
    })

    localStorage.setItem('userInfo', JSON.stringify(this.userList));

    this.ngOnInit()

  }

}
