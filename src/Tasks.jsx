import Task from './Task'

const Tasks = ({ tasks, onDelete, onToggle }) => {
    return (
        <div>
            <ul>
                {tasks.map((task) => (
                    <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} />
                ))}
            </ul>
        </div>
    )
}

export default Tasks