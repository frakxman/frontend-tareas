import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TaskListComponent],
  template: `
    <app-task-list></app-task-list>
  `,
  styles: []
})
export class AppComponent {
  title = 'frontend-tareas';
}
