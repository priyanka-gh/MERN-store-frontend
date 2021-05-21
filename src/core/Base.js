import React from 'react';
import Menu from "./Menu";
const Base=(
    {
        title="",
    description="",
    className="bg-dark text-white ",
    children
    }
)=>(
    <div>
        <Menu/>
        <div className="container-fluid">
            <div className=" bg-dark text-white text-center py-5">
                <h2 className="display-4">{title}</h2> 
                <p className="display-4">{description}</p>
            </div>
            <div className={className}>{children}</div>
        </div>
        <footer className="footer bg-dark mt-auto py-3">
            <div className="container=fluid bg-success text-white text-center py-3">
                <h6>If you have any questions, feel free to reach out</h6>
                <button className="btn btn-warning btn-sm ">Contact Us</button>
            </div>
        </footer>
    </div>
)


export default  Base;
