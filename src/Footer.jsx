import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className="footer">
            <p>© 2021 Task Tracker</p>
            <Link to="/about">About</Link>
        </div>
    )
}

export default Footer