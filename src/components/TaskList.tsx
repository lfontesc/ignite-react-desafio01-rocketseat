import { useState } from "react";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, SetError] = useState("");

  function handleCreateNewTask() {
    if (newTaskTitle === "") {
      // Implementação de uma msg de erro que some após 3 segundos
      SetError("Insira um título para criar uma nova task.");
      setTimeout(() => {
        SetError("");
      }, 3000);
    } else {
      setTasks([
        ...tasks,
        { id: Math.random() * 10, title: newTaskTitle, isComplete: false },
      ]);
      setNewTaskTitle("");
    }
  }

  function handleToggleTaskCompletion(id: number) {
    /* Implementado 2 formas de fazer a alteração, com forEach e map */

    // let newTasksUpdate = [...tasks];
    // newTasksUpdate.forEach((item: Task, index: number) => {
    //   if (item.id === id) {
    //     newTasksUpdate[index].isComplete = !newTasksUpdate[index].isComplete;
    //   }
    // });

    let newTasksUpdate = tasks.map((item: Task) => {
      if (item.id === id) {
        item.isComplete = !item.isComplete;
      }
      return item;
    });
    setTasks(newTasksUpdate);
  }

  function handleRemoveTask(id: number) {
    setTasks(tasks.filter((item: Task) => item.id !== id));
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      {error && <div className="error">{error}</div>}

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
