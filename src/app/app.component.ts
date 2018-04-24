import { Component } from '@angular/core';
//import * as $ from 'jquery';
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
      var jsonobject = this.CSV2JSON(csvData);
      //  var data = $.toObjects(csvData);
      //  var jsonobject = JSON.stringify(data);
      console.log(jsonobject);
      // if (data && data.length > 0) {
      //   this.data_list = jsonobject;
      //   console.log('Imported -' + jsonobject+ '- rows successfully!');

      // } else {
      //   console.log('No data to import!');
      // }
    };

    reader.onerror = () => {
      console.log('Unable to read ' + file);
    };
  }

  CSV2JSON(csv) {
    var array = $.toArrays(csv);
    var objArray = [];
    for (var i = 0; i < array.length; i++) {
      objArray[i] = {};
      objArray[i].name = array[i][0];
     
      var seriesArray = [];
      for (var k = 1; k < array[i].length; k++) {

        seriesArray[k] = {};
        seriesArray[k]['year'] = array[i][k].split('|')[0];
        seriesArray[k]['score'] = array[i][k].split('|')[1];

        //console.log(seriesArray[k]);
        seriesArray.push(seriesArray[k]);
      //  console.log(seriesArray[k]);
        
      }
     // console.log("seriesArray" + seriesArray[k]);
      objArray[i].series = seriesArray;

    }

    var json = JSON.stringify(objArray);
    var str = json.replace(/},/g, "},\r\n");

    return str;
  }
}
