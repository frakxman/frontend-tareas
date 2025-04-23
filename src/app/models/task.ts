/**
 * Represents a task in the application
 */
export interface Task {
  /**
   * Unique identifier for the task
   */
  id: number;

  /**
   * The title or description of the task
   */
  title: string;

  /**
   * Indicates whether the task has been completed
   */
  completed: boolean;

  /**
   * The date and time when the task was created
   */
  createdAt: Date;
}
