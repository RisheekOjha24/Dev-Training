import { Component, ElementRef, ViewChild} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { User } from './model/model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Event-Booking';
  @ViewChild('model') model:ElementRef|undefined;
  isLoginForm:boolean=true;

  userObj:User=new User();

  openPopup(){
      if(this.model){
      this.model.nativeElement.style.display='block'; 
      }
  }
  closePopup(){
    if(this.model){
    this.model.nativeElement.style.display='none'; 
    }
}
}
