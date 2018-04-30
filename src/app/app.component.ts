import { Component } from '@angular/core';
require('../../node_modules/jquery/dist/jquery.min.js');
var $ = require('../../node_modules/jquery-csv/src/jquery.csv.js');
import { UploadCsvService } from '../web-services/uploadCsvService';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UploadCsvService]
})

export class AppComponent {
  private showLineChart: boolean = false;
  private multi: any = [];
  private view: any[] = [1200, 400];  /* For LineChart view height and width */

  // Linechart options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Year';
  showYAxisLabel = true;
  yAxisLabel = 'Score';
  timeline = true;

  /* Line Chart color scheme */
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // line, area
  autoScale = true;


  constructor() { }   /* We can inject private uploadCsvService: UploadCsvService for uoloading CSV to server if required */

  /* on select of line chart */
  onSelect(event) {
    console.log(event);
  }

  /* change listener for input type file to read the data */
  fileReadListener($event: any): void {
    this.parseCSV($event.target);
  }

  /* Parsing the CSV data */
  parseCSV(csv: any): void {
    var file: File = csv.files[0];
    var self = this;
    var reader: FileReader = new FileReader();

    reader.readAsText(file);


    reader.onloadend = (e) => {
      var csvData = reader.result;
      var jsonobject = this.getJsonFromCsv(csvData);

      /* mapping data to line chart */
      this.multi = jsonobject;
      
      if(this.multi.length!=0)this.showLineChart=!this.showLineChart;
    };

    reader.onerror = () => {
      console.log('Unable to read CSV' + file);
    };
  }

  public getJsonFromCsv(csv): any {
    var array = $.toArrays(csv);
    let objArray = [];

    for (let i = 0; i < array.length; i++) {
      objArray[i] = {};
      objArray[i].name = array[i][0];

      let seriesArray = [];
      objArray[i].series = seriesArray;

      for (let k = 1; k < array[i].length; k++) {

        seriesArray[k] = {};

        seriesArray[k]['name'] = parseInt(array[i][k].split('|')[0]);
        seriesArray[k]['value'] = parseInt(array[i][k].split('|')[1]);

        seriesArray.push(seriesArray[k]);

      }

    }

    var json = JSON.stringify(objArray).split("null,").join("");

    return JSON.parse(json);
  }

}
