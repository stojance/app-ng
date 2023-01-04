import { Injectable } from '@angular/core';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { Customer } from '@app/models/customer';
import { CustomerItemResponse } from '@app/models/HttpResponses/customer.response';
import { NewCustomer } from '@app/models/HttpRequests/newcustomer.requests';
import { HttpClient } from '@angular/common/http';
import { CredentialsService } from '@app/auth';
import { map } from 'rxjs/operators';
@Injectable()
export class CustomerService {
  private _IsAddNewSubject: BehaviorSubject<boolean>;
  IsAddNew$: Observable<boolean>;
  private _CustomersSubject: Subject<Array<Customer>>;
  Customers$: Observable<Array<Customer>>;
  private URL = 'http://localhost:4000';

  constructor(private httpClient: HttpClient, private credentialsService: CredentialsService) {
    this._IsAddNewSubject = new BehaviorSubject<boolean>(false);
    this.IsAddNew$ = this._IsAddNewSubject.asObservable();
    this._CustomersSubject = new Subject<Array<Customer>>();
    this.Customers$ = this._CustomersSubject.asObservable();

    this.loadCustomers();
  }

  loadCustomers() {
    this.httpClient
      .get<Array<CustomerItemResponse>>(`${this.URL}/customers`)
      .pipe(map((api_response) => api_response.map((c: CustomerItemResponse) => new Customer(c.firstName, c.lastName))))
      .subscribe((response) => {
        //console.log(response);
        this._CustomersSubject.next(response);
      });
  }

  setAddNew() {
    this._IsAddNewSubject.next(true);
  }

  setList() {
    this._IsAddNewSubject.next(false);
    this.loadCustomers();
  }

  save(customer: Customer) {
    const new_c = new NewCustomer(customer.FName, customer.LName);
    this.httpClient.post(`${this.URL}/customers`, new_c).subscribe((response) => {
      console.log(response);
      this.setList();
    });
  }
}
