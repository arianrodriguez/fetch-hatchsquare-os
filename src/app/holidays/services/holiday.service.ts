import { Injectable } from '@angular/core';
import {enviroment} from "../../../enviroments/enviroment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HolidayService {
  api = enviroment.api;
  constructor(private http: HttpClient) { }

  getHolidays() {
    return this.http.get<any>(this.api);
  }
}
