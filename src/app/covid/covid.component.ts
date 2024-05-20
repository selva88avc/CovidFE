import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CovidService } from '../service/covid.service';
import { Covid } from '../model/covid';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-covid',
  templateUrl: './covid.component.html',
  styleUrls: ['./covid.component.css']
})
export class CovidComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ["state", "confirmed", "deceased", "recovered", "tested", "action"];
  dataSource = new MatTableDataSource<Covid>();
  pageSize: number = 10;

  @ViewChild(MatSort)
  sort: MatSort;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  bookmarks: Covid[] = [];
  covidService: CovidService = inject(CovidService);

  _liveAnnouncer: LiveAnnouncer = inject(LiveAnnouncer);
  ngOnInit(): void {
    this.covidService.getCovidData().subscribe(data => {
      this.dataSource = new MatTableDataSource<Covid>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.covidService.getBookmarks().subscribe(data => {
      this.bookmarks = data;
    });

    this.dataSource.filterPredicate = function (data: Covid, filter: string): boolean {
      return data.state.toLowerCase().includes(filter);
    };
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  checkForExist(state: string): Boolean {
    const index = this.bookmarks.findIndex(covid => {
      return covid.state === state
    });
    if (index > -1) {
      alert("This state " + state + " is already bookmarked");
      return true;
    }
    return false;
  }

  onBookmark(data: Covid) {
    if (!this.checkForExist(data.state)) {
      this.covidService.saveToBookmark(data).subscribe(
        covid => {
          this.bookmarks.push(covid);
          alert("The state " + data.state + " is bookmarked successfully");
        }
      );
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim();
    this.dataSource.filter = filterValue.toLowerCase();
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
