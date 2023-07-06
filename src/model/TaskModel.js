class TaskModel {
  constructor(tasks) {
    const storedTasks = localStorage.getItem('tasks');
    this.tasks = storedTasks ? JSON.parse(storedTasks, this.dateReviver) : tasks;
    this.saveTasks();
  }

  dateReviver(key, value) {
    if (typeof value === 'string' && key.includes('Date')) {
      return new Date(value);
    }
    return value;
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  reorderTasks(sourceIndex, destinationIndex) {
    console.log(this.tasks);
    const updatedTasks = [...this.tasks];
    const [draggedTask] = updatedTasks.splice(sourceIndex, 1);
    updatedTasks.splice(destinationIndex, 0, draggedTask);
    this.tasks = updatedTasks;
    this.saveTasks();
  }

  updateCompletion(taskId, completionDate) {
    const updatedTasks = this.tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          completionDate: completionDate ? completionDate.toISOString().slice(0, 10) : null,
        };
      }
      return task;
    });
    this.tasks = updatedTasks;
    this.saveTasks();
  }
}

export default TaskModel;
