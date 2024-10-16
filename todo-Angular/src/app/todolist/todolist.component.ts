import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css'
})
export class TodolistComponent implements OnInit {
  taskArray=[{taskName:"Brush Teeth",isCompleted:false}];
  
  ngOnInit(): void{

  }
  onSubmit(form:NgForm){
    this.taskArray.push({
      taskName:form.value["task"],
      isCompleted:false
    })
    form.reset();
  }

  onDelete(index:number){
    console.log(index);
    this.taskArray.splice(index,1);
  }
   toggleCompletion(index: number) {
    this.taskArray[index].isCompleted = !this.taskArray[index].isCompleted;
  }
}
