import { useState, useEffect } from "react";  
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import About from './components/About';

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks(); 
  }, []);
  
  //fetch all tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();
    console.log(data);
    return data;
  }

  //fetch one tasks
  const fetchTask = async (id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    console.log('fetch ', data);
    return data;
  }

  //Add Task
  const addTask = async (task) =>{   
    const res = await fetch('http://localhost:5000/tasks', {
      method : 'POST',
      headers : {                                   
        'Content-type' :  'application/json'
      },
      body : JSON.stringify(task)
    });

    const data = await res.json();
    console.log('Add task', data);
    setTasks([...tasks, data]);


    // const id = Math.floor(Math.random() * 1000 ) + 1;
    // const newTask = { id, ...task};
    // setTasks([...tasks, newTask]);

  };

  //Delet task

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method : 'DELETE'
    });
    setTasks(tasks.filter((task) => task.id !== id));
  };
 
  //Toggle reminder
  const toggleReminder = async (id) =>{
    const taskToToggle = await fetchTask(id);
    const updateTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {              
       'Content-type' : 'application/json'
      },
      body: JSON.stringify(updateTask)
    });
    const data = await res.json();
    
    
    setTasks(
      tasks.map((task) => 
        task.id === id ? { ...task, reminder : 
        !data.reminder} : task
      )
    );
    console.log('update ', data);
  };

  const Home = () => {
    return (
      <>
        {
          showAddTask && <AddTask onAdd={addTask}/>
        }
        {
          tasks.length > 0 ? (
            <Tasks 
              tasks={tasks} 
              onDelete={deleteTask} 
              onToggle={toggleReminder} 
            />
          ) : (
            'No Tasks to show'
          )
        }
      </>
    );
  };

  return (
      <div className='container'>
        <Header 
          onAdd={() => setShowAddTask(!showAddTask)} 
          showAdd={showAddTask}
        />
          
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} /> 
        </Routes>
        <Footer />
      </div>

  )
}


export default App;
