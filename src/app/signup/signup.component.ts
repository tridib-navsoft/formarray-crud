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

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {

    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{8,}$')]],
      dob: ['', [Validators.required]],
      terms: ['', [Validators.required]],
    })

  }


  public onSubmit = () => {

    /*     this.toastr.success('Signup up Successfully!', 'Success!'); */
      }

}





