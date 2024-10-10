import { useState } from "react"
import axios from "axios"

function Creat() {
    const [task, setTask] = useState();
    const handleCreate = () => {
        axios.post("http://localhost:3001/add", { task: task })
            .then(result => console.log(result))
            .catch(err => console.log(err))
        location.reload()
    }
    return (
        <div>
            <input type="text" className="inputbox" onChange={(e) => setTask(e.target.value)} />
            <button onClick={handleCreate}>Create</button>
        </div>
    )
}

export default Creat