import { Component, inject, OnInit } from '@angular/core';
import { EventService } from '../../service/event.service';
import { IAPIResponse, IEvent } from '../../model/model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
    
  eventService = inject(EventService);
  eventList:IEvent[]=[];

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(){
      this.eventService.getAllEvents().subscribe((res:IAPIResponse)=>{ 
        this.eventList=res.data;
        console.log(this.eventList);
    })
  }
}
