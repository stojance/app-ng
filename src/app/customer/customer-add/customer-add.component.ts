import { ChangeDetectionStrategy, Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Customer } from '@app/models/customer';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerAddComponent implements OnInit {
  FName: string;
  LName: string;
  @ViewChild('myForm')
  CustomerForm: NgForm;
  @Output()
  OnCancel: EventEmitter<void> = new EventEmitter();
  @Output()
  OnSave: EventEmitter<Customer> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  reset() {
    this.CustomerForm.reset();
  }

  save() {
    this.OnSave.emit(new Customer(this.FName, this.LName));
    this.reset();
  }

  cancel() {
    this.OnCancel.emit();
    this.reset();
  }
}
