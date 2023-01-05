import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { CustomerService } from './customer.service';
import { AuthenticationService } from '@app/auth';
import { CredentialsService } from '@app/auth';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  providers: [CustomerService],
})
export class CustomerComponent implements OnInit {
  Customers$: Observable<Array<Customer>>;
  IsAddNew$: Observable<boolean>;
  IsLoading$: Observable<boolean>;
  FName: string = '';
  LName: string = '';
  @ViewChild('myForm') MyForm: NgForm;

  constructor(private customerService: CustomerService, private authenticationService: AuthenticationService) {
    this.IsAddNew$ = customerService.IsAddNew$;
    this.Customers$ = customerService.Customers$;
    this.IsLoading$ = customerService.IsLoading$;
  }

  ngOnInit(): void {}

  save() {
    this.customerService.save(new Customer(this.FName, this.LName));
    this.cancel();
  }

  addNew(): void {
    this.customerService.setAddNew();
  }

  cancel(): void {
    this.customerService.setList();
    this.reset();
  }

  reset(): void {
    this.FName = '';
    this.LName = '';
    this.MyForm.reset();
  }

  logout() {
    this.authenticationService.logout();
  }
}
