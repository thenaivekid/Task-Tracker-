import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './Header'
import Tasks from './Tasks'
import AddTask from './AddTask'
import Footer from './Footer'
import About from './About'

function App() {
    const [showAddTask, setShowAddTask] = useState(false)

    const [tasks, setTasks] = useState([])

    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks();
            setTasks(tasksFromServer);
        }
        getTasks();
    }, []);

    const fetchTasks = async () => {
        const res = await fetch('http://localhost:5000/tasks');
        const data = await res.json();
        console.log(data);
        return data;
    }

    const fetchTask = async (id) => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`);
        const data = await res.json();
        console.log(data);
        return data;
    }

    const toggleReminder = async(id) => {
        const taskToToggle = await fetchTask(id);
        console.log('toggle', id)
        const updTask = {...taskToToggle, reminder: !taskToToggle.reminder};
        console.log('xxx', updTask);
        const res = await fetch(`http://localhost:5000/tasks/${id}`, {method: 'PUT', headers: {'Content-type': 'application/json'},body: JSON.stringify(updTask)});
        const data = await res.json();

        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, reminder: !task.reminder } : task
            )
        )
    };

    const addTask = async(task) => {
        console.log(task);
        const res = await fetch('http://localhost:5000/tasks', {method: 'POST', headers: {'Content-type': 'application/json'}, body: JSON.stringify(task)});
        // const id = Math.floor(Math.random() * 10000) + 1;
        // const newTask = {id, ...task};
        // setTasks([...tasks, newTask]);
        const data = await res.json();
        setTasks([...tasks, data]);
        console.log(data);
    };

    const deleteTask =  async(id) => {
        await fetch(`http://localhost:5000/tasks/${id}`, {method: 'DELETE'});
        console.log('delete', id);
        setTasks(tasks.filter((task) => task.id !== id));
    };

    return (
        <Router>
            <div className="container">
                <Header onAdd={() => setShowAddTask(!showAddTask)}      showAdd={showAddTask}>
                </Header>
                <Routes>
                    <Route path='/'  element={
                        <>
                            {showAddTask && <AddTask  onAdd={addTask}></AddTask>}
                            {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}></Tasks> : 'No Tasks to Show'}
                        </>
                    }>
                    </Route>
                    <Route path='/about' element={<About/>}></Route>
                </Routes>
                <Footer></Footer>
            </div>
        </Router>
    )
}

export default App
