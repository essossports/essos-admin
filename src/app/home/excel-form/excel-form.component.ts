import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-excel-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './excel-form.component.html',
  styleUrl: './excel-form.component.css',
})
export class ExcelFormComponent {
  constructor(private sharedService: SharedService) {}

  excelForm = new FormGroup({
    excel_data: new FormControl(''),
  });

  onSubmitExcel() {
    console.warn(this.excelForm.value.excel_data);
    // this.excelForm.value.excel_data?.split('\n').forEach((element) => {
    //   console.log(element.split('\t'));
    //   element.split('\t');
    //   // notes:  show first 3 lines of data in form to select its title
    //   // heading: Date	<month>	Day	Booked by	Contact No.	Booking Type	Customer Type	Start Time	End Time	Total Time	Rate per hour	Total Amount	Amount Received	In Khb Book	Comment	Balance (if any)	Comments (if any)
    //   // row1: 20-Jan-2024	Jan-24	Saturday	Shahi Kisran	---698	Direct	New	7:00 AM	9:00 AM	2	1250	2500	2600			-100	charges deducted
    //   // row2: 20-Jan-2024	Jan-24	Saturday	usm mdd	---698	Direct	New	7:00 AM	9:00 AM	2	1250	2500	2600			-100	charges deducted
    //   // row3: 20-Jan-2024	Jan-24	Saturday	j firan	---698	Direct	New	7:00 AM	9:00 AM	2	1250	2500	2600			-100	charges deducted
    //   // now in html show 2 field heading dropdown and row data
    //   // now match date with date etc
    // });
    const rows: string[] = this.excelForm.value.excel_data?.split('\n') || [];
    let listOfLists: string[][] = [];
    rows.forEach((row) => {
      const columns: string[] = row.split('\t');
      listOfLists.push(columns);
    });
    console.log("Excel lines:" , listOfLists.length)
    this.sharedService.fullExcelData = listOfLists;
    this.sharedService.firstExcelData = listOfLists[0];
    this.sharedService.currentPage = this.sharedService.pages['excel-match'];
  }
}
