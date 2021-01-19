import React, { useState, useReducer, useEffect, useCallback, useRef } from 'react'
import { useHistory } from 'react-router'
import { AUTH_TOKEN, LOGGED_USER_NAME } from './constants'
import { gql, useMutation, useLazyQuery } from '@apollo/client'
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { DeleteTask, CompleteTask } from './Droppable'
import { Task, DraggableTask } from './Task';
import SubmitButton from './SubmitButton';

function Dashboard() {
    const newTaskMutation = gql`
        mutation newTask(
          $name: String!
          $username: String!
        ) {
          newTask(name: $name, username: $username) {
            name, id, completed
          }
        }
    `;

    const getTasksQuery = gql`
        query tasks($username: String!) {
            tasks(username: $username) {
                name, id, completed
            }
        }
  `;

    const removeTaskMutation = gql`
            mutation removeTask($taskId: ID!, $username: String!) {
                removeTask(taskId: $taskId, username: $username) {
                    name, id, completed
                }
            }
      `;
    const completeTaskMutation = gql`
            mutation completeTask($taskId: ID!, $username: String!) {
                completeTask(taskId: $taskId, username: $username) {
                    name, id, completed
                }
            }
      `;

    const history = useHistory();
    const formatTasks = (tasksReducer, action) => {
        console.log(JSON.stringify(action.tasks, null, 2))
        return action.tasks.map((task, index) => <DraggableTask id={task.id} key={index} classes={task.completed ? "border-l-4 border-green-400" : ""} name={task.name} />)
    }
    const [tasksReducer, dispatch] = useReducer(formatTasks);
    const [newTaskName, setNewTaskName] = useState("");
    const [tasks, setTasks] = useState();
    const newTaskInput = useRef();
    const [newTask] = useMutation(newTaskMutation);
    const [completeTask] = useMutation(completeTaskMutation);
    const [removeTask] = useMutation(removeTaskMutation);
    const [getTasks, { loading, data }] = useLazyQuery(getTasksQuery);
    const [activeId, setActiveId] = useState(null);
    function handleDragStart(event) {
        setActiveId(event.active.id);
    }

    async function handleDragEnd(event) {
        const { id } = tasks.filter(task => task.id === event.active.id)[0];

        if (event.over && event.over.id === "delete-droppable") {
            try {
                const tasksUpdate = await removeTask({ variables: { taskId: id, username: localStorage.getItem(LOGGED_USER_NAME) } })
                dispatch({ tasks: tasksUpdate.data.removeTask.filter(task => task.id !== id) });

            } catch (error) {
                console.log(JSON.stringify(error, null, 2))
            }
        }

        if (event.over && event.over.id === "complete-droppable") {
            try {
                const tasksUpdate = await completeTask({ variables: { taskId: id, username: localStorage.getItem(LOGGED_USER_NAME) } })
                dispatch({ tasks: tasksUpdate.data.completeTask });
            } catch (error) {
                console.log(JSON.stringify(error, null, 2))
            }
        }
        setActiveId(null);
    }

    const createTask = useCallback(async () => {
        try {
            const tasks = await newTask({ variables: { name: newTaskName, username: localStorage.getItem(LOGGED_USER_NAME) } })
            dispatch({ tasks: tasks.data.newTask });
            setTasks(tasks.data.newTask);
        } catch (error) {
            console.log(JSON.stringify(error, null, 2));
        }
    }, [newTask, newTaskName])

    useEffect(() => {
        if (!localStorage.getItem(AUTH_TOKEN)) {
            history.push({ pathname: '/welcome' })
        }
    }, [history]);

    useEffect(() => {
        getTasks({
            variables: { username: localStorage.getItem(LOGGED_USER_NAME) }
        });
        if (data && data.tasks) {
            dispatch({ tasks: data.tasks })
            setTasks(data.tasks);
        }
    }, [data, getTasks])


    return (
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className="flex items-center justify-between w-full min-h-screen overflow-x-hidden bg-gray-50">
                <div style={{ flex: "7 7 0%" }} className="flex flex-col items-center h-screen p-6 space-y-3 bg-gray-50">
                    <section className="flex items-center justify-center w-full p-3 mt-5 bg-gray-100 sm:w-5/6 h-28 rounded-xl">
                        <input ref={newTaskInput} placeholder="Name of new task" type="text" onChange={(e) => { setNewTaskName(e.target.value) }} className="w-4/5 p-2 rounded-xl" />
                        <SubmitButton onClick={() => { createTask(); newTaskInput.current.value = "" }} className="p-1 m-2 bg-gray-900 hover:bg-gray-700 rounded-xl" />
                    </section>
                    <section className="flex flex-col items-start flex-1 w-full overflow-y-auto bg-gray-100 sm:w-5/6 rounded-xl">
                        {!loading && tasksReducer &&
                            tasksReducer
                        }
                        <DragOverlay>
                            {activeId && <Task id={activeId} name={tasks.filter(task => task.id === activeId)[0].name} />}
                        </DragOverlay>
                    </section>
                </div>

                <span className="flex flex-col flex-1 w-1/12 h-full">
                    {activeId &&
                        <React.Fragment>
                            <DeleteTask className="flex-1 max-w-full" />
                            <CompleteTask className="flex flex-1 max-w-full" />
                        </React.Fragment>
                    }
                </span>

            </div>
        </DndContext>
    )
}
export default Dashboard;