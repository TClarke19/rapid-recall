import React from "react";

const Projects = () => {

    return (
        <div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/projects">Projects</Link>
                <Link to="/logout">Logout</Link>
            </nav>
            <h1>Projects</h1>
            <Button variant="primary">Add Card</Button>{' '}
            <Button variant="danger">Delete Card</Button>{' '}
        </div>
    )
}

export default Projects