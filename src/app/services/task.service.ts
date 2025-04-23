/**
 * Service responsible for handling all task-related HTTP communications with the backend.
 * Provides methods for CRUD operations on tasks and error handling.
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  /**
   * Base URL for the tasks API endpoints
   * @private
   */
  private apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) { }

  /**
   * Retrieves all tasks from the backend
   * @returns An Observable that emits an array of Task objects
   */
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  /**
   * Creates a new task
   * @param task - Object containing the title and completed status of the new task
   * @returns An Observable that emits the created Task object
   */
  createTask(task: { title: string; completed: boolean }): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task)
      .pipe(catchError(this.handleError));
  }

  /**
   * Updates an existing task
   * @param id - The unique identifier of the task to update
   * @param task - Object containing the properties to update (title and/or completed status)
   * @returns An Observable that emits the updated Task object
   */
  updateTask(id: number, task: { title?: string; completed?: boolean }): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task)
      .pipe(catchError(this.handleError));
  }

  /**
   * Deletes a task
   * @param id - The unique identifier of the task to delete
   * @returns An Observable that emits void on successful deletion
   */
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Handles HTTP errors by transforming them into user-friendly error messages
   * @param error - The HTTP error response
   * @private
   * @returns An Observable that emits an Error with a user-friendly message
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ha ocurrido un error desconocido';

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Código de error: ${error.status}, mensaje: ${error.error.message || error.statusText}`;
    }

    return throwError(() => new Error(errorMessage));
  }
}
