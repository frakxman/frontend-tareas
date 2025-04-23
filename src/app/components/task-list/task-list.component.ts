/**
 * Component responsible for managing and displaying the task list.
 * Provides functionality for creating, updating, completing, and deleting tasks.
 * Implements reactive forms for task input and real-time validation.
 */
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
  /**
   * Array to store all tasks
   */
  tasks: Task[] = [];

  /**
   * Reactive form group for task creation/editing
   */
  taskForm!: FormGroup;

  /**
   * Flag to indicate loading state
   */
  loading = false;

  /**
   * Stores error messages to display to the user
   */
  error: string | null = null;

  /**
   * Stores success messages to display to the user
   */
  success: string | null = null;

  /**
   * Stores the ID of the task being edited, null when creating a new task
   */
  editingTaskId: number | null = null;

  /**
   * Subject for handling component destruction and cleaning up subscriptions
   * @private
   */
  private destroy$ = new Subject<void>();

  constructor(
    private taskService: TaskService,
    private fb: FormBuilder
  ) {
    this.initializeForm();
  }

  /**
   * Initializes the component and loads tasks
   */
  ngOnInit(): void {
    this.loadTasks();
  }

  /**
   * Cleans up subscriptions when component is destroyed
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Initializes the reactive form with default values
   * @private
   */
  private initializeForm(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required]],
      completed: [false]
    });
  }

  /**
   * Loads all tasks from the backend
   */
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

  /**
   * Handles form submission for both creating and updating tasks
   */
  onSubmit(): void {
    if (this.taskForm.invalid) {
      return;
    }

    this.loading = true;
    const taskData = this.taskForm.value;

    if (this.editingTaskId) {
      this.updateExistingTask(taskData);
    } else {
      this.createNewTask(taskData);
    }
  }

  /**
   * Creates a new task
   * @param taskData - The task data from the form
   * @private
   */
  private createNewTask(taskData: { title: string; completed: boolean }): void {
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

  /**
   * Updates an existing task
   * @param taskData - The updated task data from the form
   * @private
   */
  private updateExistingTask(taskData: { title: string; completed: boolean }): void {
    if (!this.editingTaskId) return;

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
  }

  /**
   * Prepares the form for editing an existing task
   * @param task - The task to edit
   */
  editTask(task: Task): void {
    this.editingTaskId = task.id;
    this.taskForm.patchValue({
      title: task.title,
      completed: task.completed
    });
  }

  /**
   * Toggles the completion status of a task
   * @param task - The task to toggle
   */
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

  /**
   * Deletes a task after confirmation
   * @param id - The ID of the task to delete
   */
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

  /**
   * Resets the form to its initial state
   */
  resetForm(): void {
    this.taskForm.reset({ title: '', completed: false });
    this.editingTaskId = null;
    this.loading = false;
  }

  /**
   * Cancels the current edit operation
   */
  cancelEdit(): void {
    this.resetForm();
  }

  /**
   * Automatically hides success/error messages after a delay
   * @private
   */
  private hideMessage(): void {
    setTimeout(() => {
      this.error = null;
      this.success = null;
    }, 5000);
  }
}
