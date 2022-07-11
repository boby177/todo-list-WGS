import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListTask } from '../models/tasks.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todoForm !: FormGroup
  tasks : ListTask [] = []
  inProgress : any [] = []
  done : ListTask [] = []
  updateIndex !: any
  isEditEnabled : boolean = false

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item : ['', Validators.required]
    })
  }
  
  addTask(){
    this.tasks.push({
      description: this.todoForm.value.item,
      done:false
    })
    this.todoForm.reset()
  }

  drop(event: CdkDragDrop<ListTask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  onEdit(item: ListTask, i: number){
    this.todoForm.controls['item'].setValue(item.description)
    this.updateIndex = i
    this.isEditEnabled = true
  }

  updateTask(){
    this.tasks[this.updateIndex].description = this.todoForm.value.item
    this.tasks[this.updateIndex].done = false
    this.todoForm.reset()
    this.updateIndex = undefined
    this.isEditEnabled = false
  }

  deleteTask(i: number) {
    this.tasks.splice(i,1)
  }

  deleteInProgressTask(i: number) {
    this.inProgress.splice(i,1)
  }

  deleteFinishedTask(i: number) {
    this.done.splice(i,1)
  }

}
