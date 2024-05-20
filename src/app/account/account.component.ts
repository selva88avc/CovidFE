import { Component } from '@angular/core';
import { CovidService } from '../service/covid.service';
import { FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  submitted: Boolean = false;
  constructor(private covidService: CovidService, private formBuilder: FormBuilder, private router: Router) {

  }
  accountForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    firstName: ['', Validators.required],
    lastName: '',
    city: ['', Validators.required],
    address1: '',
    address2: ''
  });
  get f() { return this.accountForm.controls; }
  onSubmit(): void {
    this.submitted = true;
    if (this.accountForm.invalid) {
      return;
    }
    this.submitted = false;
    this.covidService.saveUser(this.accountForm.value)
      .pipe(first())
      .subscribe(
        data => {
          console.warn('Your account has been submitted');
          this.router.navigateByUrl('');
        },
        error => {
          console.error("not created");
        });
    this.accountForm.reset();
  }
  
}
