import { Component,Input } from '@angular/core';
import {Hero} from '../hero';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css'
})
export class HeroDetailComponent {
  work="nevermind";
  @Input() hero?: Hero;
}
