import { Link } from 'react-router-dom'

const Navbar = () => {

    return (
        <header>
            <div className="container major-mono-display-regular">
                <Link to="/">
                    <h1>Workout Planner</h1>
                </Link>

            </div>
        </header>
    )
}

export default Navbar