import {Component, OnInit, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from "@angular/material/table";
import {HolidayService} from "../../services/holiday.service";
import {Holiday} from "../../entities/holiday";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-holiday-table',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatPaginator
  ],
  templateUrl: './holiday-table.component.html',
  styleUrl: './holiday-table.component.css'
})
export class HolidayTableComponent implements OnInit {
  data: any[] = [];
  elementsArray = new MatTableDataSource<any>(this.data);
  displayedColumns: string[] = ['name', 'description', 'date', 'type'];

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  constructor(private holidayService: HolidayService){}

  ngOnInit() {
    this.getHolidays();
  }

  getHolidays() {
    this.holidayService.getHolidays().subscribe(
      (result) => {
        const holidays = result.response.holidays;

        for(let i=0; i<holidays.length; ++i) {
          const holiday = new Holiday();
          holiday.name = holidays[i].name;
          holiday.description = holidays[i].description;
          holiday.date = holidays[i].date.iso;

          if(holiday.date.length > 10) holiday.date = holiday.date.substring(0, 10);

          holiday.type = holidays[i].type[0];

          this.data.push(holiday);

        }

        this.elementsArray = new MatTableDataSource<any>(this.data);
        this.elementsArray.paginator = this.paginator;
      },
      (error) => console.error(error)
    )
  }
}
