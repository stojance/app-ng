import {
  Component,
  AfterViewInit,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Customer } from '@app/models/customer';
import { Observable, Subject, Subscription, of } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  @Input()
  Customers$: Observable<Array<Customer>>;
  CustomersSubscription: Subscription;
  Customers: Array<Customer> = [];
  @Output()
  OnAddNew: EventEmitter<void> = new EventEmitter();
  dtOptions: DataTables.Settings = {};
  showTable: boolean = false;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      columns: [
        {
          title: 'First Fame',
          data: 'FName',
        },
        {
          title: 'Last Name',
          data: 'LName',
        },
      ],
      data: [],
    };

    this.CustomersSubscription = this.Customers$.subscribe((data) => {
      this.Customers = data;
      this.dtOptions = {
        pagingType: 'full_numbers',
        columns: [
          {
            title: 'First Fame',
            data: 'FName',
          },
          {
            title: 'Last Name',
            data: 'LName',
          },
        ],
        data: [...data],
      };

      this.showTable = true;
      console.log(this.Customers);
      console.log(this.dtOptions);
    });
  }

  ngOnDestroy(): void {
    this.CustomersSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {}

  addNew() {
    this.OnAddNew.emit();
  }
}
