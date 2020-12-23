import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  public submitted: boolean = false;
  public agreeTandc: boolean = false;

  public allClassData = [
    {
    'courseName':'Secondary'
    },
   {
    'courseName':'Higher-Secondary'
   },
   {
    'courseName':'Graduation'
    }
]

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {

    let arr=[];
    for(let i=0;i< this.allClassData.length;i++)
    {
      arr.push(this.BuildFormDynamic(this.allClassData[i]))

    }

    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{8,}$')]],
      dob: ['', [Validators.required]],
      terms: ['', [Validators.required]],
      qualification:this.formBuilder.array(arr)
    })
  }

  BuildFormDynamic(classDatas):FormGroup{
    return this.formBuilder.group({
          class:[classDatas.courseName],
          passingYear:[''],
          collegeName:[''],
          percentage :['']
     })
   }


  public onSubmit = () => {

    let arr=[];
    for(let i=0;i< this.allClassData.length;i++)
    {
      arr.push(this.BuildFormDynamic(this.allClassData[i]))

    }

    /*     this.toastr.success('Signup up Successfully!', 'Success!'); */
      }

}





