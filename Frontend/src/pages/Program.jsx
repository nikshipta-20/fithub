import React from "react";
import { useParams } from "react-router-dom";

function Program() {
    const { user, pid } = useParams();


    return (
        <div>
            <h2>Add Program</h2>
            <p>User ID: {user}</p>
            <p>Program ID: {pid}</p>
        </div>
    );
}

export default Program;
