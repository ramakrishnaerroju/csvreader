import { Component } from '@angular/core';
//import * as $ from 'jquery';
var $  = require('jquery');
require('../../node_modules/jquery-csv/src/jquery.csv.js');
import { UploadCsvService } from '../web-services/uploadCsvService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UploadCsvService]
})
export class AppComponent {
  data_list: any;

  constructor(private uploadCsvService: UploadCsvService) { }

  fileUploadListener($event: any): void {
    this.parseCSV($event.target);
  }

  parseCSV(csv: any): void {
    var file: File = csv.files[0];
    var self = this;
    var reader: FileReader = new FileReader();

    reader.readAsText(file);
    reader.onloadend = (e) => {
      var csvData = reader.result;
      var data = $.csv.toArrays(csvData); 

      if (data && data.length > 0) {
        this.data_list = data;
        console.log('Imported -' + data.length + '- rows successfully!');

      } else {
        console.log('No data to import!');
      }
    };

    reader.onerror = () => {
      console.log('Unable to read ' + file);
    };
  }
}
