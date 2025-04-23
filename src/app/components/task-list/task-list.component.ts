import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DatePipe]
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  taskForm: FormGroup;
  loading = false;
  error: string | null = null;
  success: string | null = null;
  editingTaskId: number | null = null;

  private destroy$ = new Subject<void>();

  constructor(
    private taskService: TaskService,
    private fb: FormBuilder
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required]],
      completed: [false]
    });
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadTasks(): void {
    this.loading = true;
    this.taskService.getTasks()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (tasks) => {
          this.tasks = tasks;
          this.loading = false;
        },
        error: (error) => {
          this.error = `Error al cargar tareas: ${error.message}`;
          this.loading = false;
          this.hideMessage();
        }
      });
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      return;
    }

    this.loading = true;
    const taskData = this.taskForm.value;

    if (this.editingTaskId) {

      this.taskService.updateTask(this.editingTaskId, taskData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.success = 'Tarea actualizada correctamente';
            this.loadTasks();
            this.resetForm();
          },
          error: (error) => {
            this.error = `Error al actualizar tarea: ${error.message}`;
            this.loading = false;
            this.hideMessage();
          }
        });
    } else {
      this.taskService.createTask(taskData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.success = 'Tarea creada correctamente';
            this.loadTasks();
            this.resetForm();
          },
          error: (error) => {
            this.error = `Error al crear tarea: ${error.message}`;
            this.loading = false;
            this.hideMessage();
          }
        });
    }
  }

  editTask(task: Task): void {
    this.editingTaskId = task.id;
    this.taskForm.patchValue({
      title: task.title,
      completed: task.completed
    });
  }

  toggleComplete(task: Task): void {
    this.loading = true;
    this.taskService.updateTask(task.id, { completed: !task.completed })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.success = `Tarea ${!task.completed ? 'completada' : 'marcada como pendiente'}`;
          this.loadTasks();
        },
        error: (error) => {
          this.error = `Error al actualizar tarea: ${error.message}`;
          this.loading = false;
          this.hideMessage();
        }
      });
  }

  deleteTask(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      this.loading = true;
      this.taskService.deleteTask(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.success = 'Tarea eliminada correctamente';
            this.loadTasks();
          },
          error: (error) => {
            this.error = `Error al eliminar tarea: ${error.message}`;
            this.loading = false;
            this.hideMessage();
          }
        });
    }
  }

  resetForm(): void {
    this.taskForm.reset({ title: '', completed: false });
    this.editingTaskId = null;
    this.loading = false;
  }

  cancelEdit(): void {
    this.resetForm();
  }

  private hideMessage(): void {
    setTimeout(() => {
      this.error = null;
      this.success = null;
    }, 5000);
  }
}
