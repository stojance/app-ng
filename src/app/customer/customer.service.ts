import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Customer } from '../models/customer';

@Injectable()
export class CustomerService {
  private _Customers: Array<Customer>;
  private _IsAddNewSubject: BehaviorSubject<boolean>;
  IsAddNew$: Observable<boolean>;
  Customers$: Observable<Array<Customer>>;

  constructor() {
    this._Customers = new Array<Customer>();
    this._Customers.push(new Customer('Ацо', 'Пејович'));
    this._Customers.push(new Customer('Мирко', 'Попов'));
    this._Customers.push(new Customer('Красимир', 'Каракачанов'));
    this._Customers.push(new Customer('Рајко', 'Жинзифов'));

    this._IsAddNewSubject = new BehaviorSubject<boolean>(false);
    this.IsAddNew$ = this._IsAddNewSubject.asObservable();
    this.Customers$ = of(this._Customers);
  }

  setAddNew() {
    this._IsAddNewSubject.next(true);
  }

  setList() {
    this._IsAddNewSubject.next(false);
  }

  save(customer: Customer) {
    this._Customers.push(customer);
    //this.Customers$ = of(this._Customers);
    this.setList();
  }
}
