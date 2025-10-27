
import { NavLink, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";




const Welcome= ()=> {
    const navigate = useNavigate();
    return (
        <>
        <div className= "mx-auto centered-container">
        <NavBar />
        <div style={{ textAlign: "center" }}>
            <h1>Welcome to the Expense Tracker</h1>
            <NavLink onClick={() => navigate('/add')} to={"/add"}>Add New Expense</NavLink> <> | </>
            <NavLink onClick={() => navigate('/list')} to={"/list"}>View Expense List</NavLink>
            </div>
            </div>
        </>
    );
};

export default Welcome;