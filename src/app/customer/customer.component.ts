import { Component, OnInit, ViewChild } from '@angular/core';
import { Customer } from '../models/customer';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  Customers: Array<Customer>;
  IsAddNew: boolean;
  FName: string = '';
  LName: string = '';
  @ViewChild('myForm') MyForm: NgForm;

  constructor() {
    this.IsAddNew = false;
    //this.Reset();
    this.Customers = new Array<Customer>();
    this.Customers.push(new Customer('Ацо', 'Пејович'));
    this.Customers.push(new Customer('Мирко', 'Попов'));
    this.Customers.push(new Customer('Красимир', 'Каракачанов'));
    this.Customers.push(new Customer('Рајко', 'Жинзифов'));
  }

  ngOnInit(): void {}

  Save() {
    this.Customers.push(new Customer(this.FName, this.LName));
    this.Cancel();
  }

  AddNew(): void {
    this.IsAddNew = true;
  }

  Cancel(): void {
    this.IsAddNew = false;
    this.Reset();
  }

  Reset(): void {
    this.FName = '';
    this.LName = '';
    this.MyForm.reset();
  }

  /*
  ChangeFName(name: string): void {
    this.FName = name;
  }

  ChangeLName(name: string): void {
    this.LName = name;
  }
  */
}
