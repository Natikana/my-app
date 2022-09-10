import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

export type ObjectType = {
    title: string,
    filter: FilterValuesType
    tasks:TaskType[]
    students:Array<string>
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

function App() {

    /*let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })*/

    /*let [todolists, setTodolists] = useState<Array<TodolistsType>>(
          [
              {id: v1(), title: 'What to learn', filter: 'all'},
              {id: v1(), title: 'What to buy', filter: 'active'},
          ]
      )

      let [tasks, setTasks] = useState([
          {id: v1(), title: "HTML&CSS", isDone: true},
          {id: v1(), title: "JS", isDone: true},
          {id: v1(), title: "ReactJS", isDone: false},
          {id: v1(), title: "Rest API", isDone: false},
          {id: v1(), title: "GraphQL", isDone: false},
      ]);*/
    //let [filter, setFilter] = useState<FilterValuesType>("all");
    let [todo, setTodo] = useState<Array<ObjectType>>([
        {
            title: 'What to learn',
            filter: 'all',
            tasks: [{id: v1(), title: 'Rest API', isDone: true},
                {id: v1(), title: 'GraphQL', isDone: false},
            ],
            students: [
            'Sonia', 'Sasha', 'Nata', 'Jeka'
        ]
        },
        {
            title: 'What to buy',
            filter: 'all',
            tasks: [
                {id: v1(), title: 'HTML&CSS', isDone: true},
                {id: v1(), title: 'JS', isDone: true},
                {id: v1(), title: 'ReactJS', isDone: false},
            ],
            students: [
                'Sonia', 'Sasha', 'Nata', 'Jeka'
            ]
        },
    ])

    function removeTask(todoId:number,id: string) {

        /*let filteredTasks = tasks.filter(t => t.id !== id);
        setTasks(filteredTasks);*/
        //setTasks({...tasks,[todoId]:tasks[todoId].filter(el => el.id !== id)})
        setTodo(todo.map((el,index )=> index === todoId ? {...el,tasks:el.tasks.filter(el => el.id !== id)} : el))
    }
    function addTask(todoId:number,title: string) {
        /*let task = {id: v1(), title: title, isDone: false};
        let newTasks = [task, ...tasks];
        setTasks(newTasks);*/
        /*let newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks,[todoId]:[newTask,...tasks[todoId]]})*/
        let newTask = {id: v1(), title: title, isDone: false}
        setTodo(todo.map((el,index )=> index === todoId ? {...el,tasks:[newTask,...el.tasks]} : el))
    }
    function changeStatus(todoId:number,taskId: string, isDone: boolean) {
        /*let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }
        setTasks([...tasks]);*/
        //setTasks({...tasks,[todoId]:tasks[todoId].map(el => el.id === taskId ? {...el,isDone} : el)})
        setTodo(todo.map((el, index) => index === todoId ? {...el,tasks:el.tasks.map(el => el.id === taskId ? {...el,isDone} : el )} : el))
    }
    /*let tasksForTodolist = tasks;

    if (todolists[0].filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.isDone );
    }
    if (todolists[1].filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone);
    }*/
    function changeFilter(todoId:number,value: FilterValuesType) {
        //setTodolists(todolists.map(el => (el.id === id ? {...el,filter:value} : el)))
        setTodo(todo.map((el,index) => index === todoId ? {...el,filter:value} : el))
    }
    const removeTodoList = (todoId:number) => {
        /*setTodolists(todolists.filter(el => el.id !== todoId))
        delete tasks[todoId]*/
        setTodo(todo.filter((el,index) => index !== todoId ))
        delete todo[todoId]
        console.log(todo)
    }

    return (
        <div className="App">
            {todo.map((el,index )=> {
                let tasksForTodolist = el.tasks;

                if (el.filter === "active") {
                    tasksForTodolist = el.tasks.filter(t => !t.isDone )
                }
                if (el.filter === "completed") {
                    tasksForTodolist = el.tasks.filter(t => t.isDone)
                }
                return (
                    <Todolist
                              key={index}
                              todoId={index}
                              title={el.title}
                              tasks={tasksForTodolist}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              changeTaskStatus={changeStatus}
                              filter={el.filter}
                              removeTodoList={removeTodoList}
                    />
                )
            })}

        </div>
    );
}
export default App;
