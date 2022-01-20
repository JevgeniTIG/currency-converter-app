import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {conf} from "../conf/conf";


const CURRENCY_CONVERTER_API = 'https://free.currconv.com/api/v7/convert';
const API_KEY = conf.key;

@Injectable({
  providedIn: 'root'
})

export class ConvertService {

  constructor(private http: HttpClient) {
  }


  getExchangeRate(fromToPair: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('q', fromToPair);
    params = params.append('compact', 'ultra');
    params = params.append('apiKey', API_KEY);

    return this.http.get(CURRENCY_CONVERTER_API, {params: params});

  }
}
