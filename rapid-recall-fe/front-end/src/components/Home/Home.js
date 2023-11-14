import React from "react";
import React from "bootstrap";

const Home = () => {
    //React code

    return (
        <div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/projects">Projects</Link>
                <Link to="/logout">Logout</Link>
            </nav>
            <h1>Home page</h1>
            <Button variant="primary">Add Project</Button>{' '}
            <Button variant="danger">Delete Project</Button>{' '}
        </div>
    )
}

export default Home