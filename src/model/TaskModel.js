class TaskModel {
  constructor(tasks) {
    const storedTasks = localStorage.getItem('tasks');
    const parsedTasks = storedTasks ? JSON.parse(storedTasks, this.dateReviver) : [];
    this.tasks = tasks ? [...tasks] : parsedTasks;
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

  addTask(summary, project, tags) {
    const updatedTasks = [...this.tasks, 
      { 
        id: crypto.randomUUID(), 
        summary: summary, 
        project: project, 
        tags: tags, 
        creationDate: new Date(),
        completionDate: null  
      }];
    this.tasks = updatedTasks;
    this.saveTasks();
  }

  reorderTasks(sourceIndex, destinationIndex) {
    const updatedTasks = [...this.tasks];
    const [draggedTask] = updatedTasks.splice(sourceIndex, 1);
    updatedTasks.splice(destinationIndex, 0, draggedTask);
    this.tasks = updatedTasks;
    const arr = [1, 2, 8, 4, 5];
const toMove = arr[2];
 
const newArr = [
  ...arr.slice(0, 2),
  ...arr.slice(3),
     toMove
];


    this.saveTasks();
  }

  updateCompletion(taskId, completionDate) {
    const updatedTasks = this.tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          completionDate: completionDate,
        };
      }
      return task;
    });
    this.tasks = updatedTasks;
    this.saveTasks();
  }
}

export default TaskModel;
