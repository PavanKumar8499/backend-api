import { useEffect, useState } from 'react';
import Create from './creat';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './style.css'
function Home() {
    // states to saves my todo from fetch api
    const [todos, setTodos] = useState([]);

    //to get all my data  from data base
    useEffect(() => {
        axios.get('http://localhost:3001/fetchtask')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    }, []);

    // arrow function to update status is task completed or not by passing id as params 
    const handleChecked = (id) => {
        axios.put(`http://localhost:3001/update/${id}`)
            .then(result => console.log(result))
            .catch(err => console.log(err));
        location.reload()
    }
    // same arrow fun just http method change 
    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/delete/${id}`)
            .then(result => console.log(result))
            .catch(err => console.log(err));
        location.reload()
    }
    // same 
    const handleUpdate = (id) => {
        axios.put(`http://localhost:3001/rewrite/${id}`)
            .then(result => console.log(result))
            .catch(err => console.log(err));
        location.reload()
    }

    return (
        <div className="todo-container">
            <h2>Todo List</h2>
            <Create />
            {todos.length === 0 ? (
                <div className="no-task">
                    <h2>No Task Available</h2>
                </div>
            ) : (
                todos.map(todo => (
                    <div key={todo._id} className="todo-item">
                        <div className='left-content' onClick={() => handleChecked(todo._id)}>
                            {/* why we write arrow func here becoz we need one argument from func right and if we write like this onclick ={handleChecked(todo._id)} then it shows that we already calling this function so it will get call when component get rendered but that dont we want we want to call this fucntion when that button or icon will click right ? so that why we write that things into arrow function so its takes argument and pass or call this function when icon click  */}

                            {todo.done ?
                                <FontAwesomeIcon icon={faCheckCircle} className="check-icon" />
                                :
                                <FontAwesomeIcon icon={faCircle} className="check-icon" />
                            }
                            <p className={todo.done ? `tasksChecked` : `todo-tasks`} >
                                {todo.task}
                            </p>
                        </div>
                        <div className='right-content'>
                            <FontAwesomeIcon icon={faEdit}
                                className="edit-icon"
                                onClick={() => handleUpdate(todo._id)}

                            />
                            <FontAwesomeIcon icon={faTrash}
                                className="delete-icon"
                                onClick={() => handleDelete(todo._id)}
                            />
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default Home;






// import { useEffect, useState } from 'react'
// import Create from './creat'
// import axios from 'axios'

// function Home() {
//     const [todos, setTodos] = useState([])
//     useEffect(() => {
//         const data = axios.get('http://localhost:3001/fetchtask')
//             .then(result => setTodos(result.data))
//             .catch(err => console.log(err))
//         console.log(data, 'data------------>')

//     }, [])
//     return (
//         <div>
//             <h2>Todo List</h2>
//             <Create />
//             {
//                 todos.length === 0 ?
//                     <div>
//                         <h2>No Task Available</h2>
//                     </div>
//                     :
//                     todos.map(todo => (
//                         <div key={todo._id}>
//                             {todo.task}
//                         </div>
//                     ))
//             }
//         </div>
//     )
// }

// export default Home