import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()

export class UploadCsvService {

    private url: string = "http://www.test.com";
    constructor(private http: HttpClient) {
        console.log('PostService Initialized...');
    }

    uploadCSVDataToServer(params: any) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'my-auth-token'
            })
        };
        return this.http.post(this.url, params, httpOptions);
    }

}