import { AsyncPipe, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from './country';
import { CountryService } from './country.service';
import { SortableHeaderDirective, SortEvent } from './sortable.directive';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-table-complete',
  standalone: true,
  imports: [
    NgFor,
    DecimalPipe,
    FormsModule,
    AsyncPipe,
    NgbTypeaheadModule,
    SortableHeaderDirective,
    NgbPaginationModule,
    NgIf,
  ],
  templateUrl: './table-complete.component.html',
  styleUrls: ['./table-complete.component.scss'],
  providers: [CountryService, DecimalPipe],
})
export class TableCompleteComponent {
  countries$: Observable<Country[]>;
  total$: Observable<number>;

  @ViewChildren(SortableHeaderDirective) headers: QueryList<SortableHeaderDirective>;

  constructor(public service: CountryService) {
    this.countries$ = service.countries$;
    this.total$ = service.total$;
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
}
