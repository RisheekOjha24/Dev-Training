import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAPIResponse, IEvent } from '../model/model';
import { map } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class EventService {

  apiUrl:string="https://freeapi.miniprojectideas.com/api/EventBooking/";
  
  constructor(private http: HttpClient) { }
  //dependecy injection

  getAllEvents(){
     return this.http.get<IAPIResponse>(`${this.apiUrl}GetAllEvents`)
  }

  getEventById(eventId:number){
    return this.http.get<IEvent>(`${this.apiUrl}GetEventById?id=${eventId }`).pipe(
      map((item:any)=>{
        return item.data
      })
    )
  }

  getEventsByOrganizer(organizerId:number){
    return this.http.get<IEvent>(`${this.apiUrl}GetEventsByOrganizer?organizerId=${organizerId}`).pipe(
      map((item:any)=>{
        return item.data
      })
    )
  }
}