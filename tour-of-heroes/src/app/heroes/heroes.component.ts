import { Component } from '@angular/core';
import { Hero } from '../hero';
import {HEROES} from '../mock-heroes';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [CommonModule,FormsModule,NgFor,NgIf],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent {
  hero:Hero={
    id:2,name:"Arun"
  };
  heroes=HEROES;
  selectedHero?:Hero;
  
  onSelect(hero:Hero):void{
    this.selectedHero=hero;
    }
}
