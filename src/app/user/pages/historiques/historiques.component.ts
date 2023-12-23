import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { historique } from 'src/app/model/historique';
import { HistoriqueService } from 'src/app/services/historique.service';
import { MesureService } from 'src/app/services/mesure.service';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { DatePipe } from '@angular/common';

@Component({
  providers: [DatePipe],
  selector: 'app-historiques',
  templateUrl: './historiques.component.html',
  styleUrls: ['./historiques.component.css']
})
export class HistoriquesComponent implements OnInit {
  currentDate: string;
  historiques: any[] = []; // initialize the array with empty values

  constructor(private historiqueService: HistoriqueService,private mesureService: MesureService , private datePipe: DatePipe) {
    this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd') || '';

  }

  ngOnInit() {
    this.gethistoriques();
    
    // code for initializing the historiques array
    // ...
  }
  public gethistoriques(): void {
    this.historiqueService.gethistorique().subscribe({
      next: (response: historique[]) => {
        console.log(response);
        console.log("responseresponseresponseresponseresponseresponse");
        this.historiques = response;
        
        this.historiques[0].mesure = this.mesureService.getmesureById(this.historiques[0].mesure)
        console.log(this.historiques[0].mesure )
        },
      error: (error: HttpErrorResponse) => {
          alert(error.message);
        },
      complete: () => {
        console.log('complete');
        }
    });
  }
  filedownload() {
    var options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true, 
      showTitle: true,
      title: 'Report Data',
      useBom: true,
      headers: ["Zone", "Date", "Sol", "Externe"]  
    };
   
    new ngxCsv(this.historiques, "Report", options);
  }
}
