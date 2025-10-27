import { useContext } from "react";
import { PageContext } from "../App";




const Welcome= ()=> {
    const { setCurrentPage } = useContext(PageContext);
    return (
        <>
            <h1>Welcome to the Expense Tracker</h1>
            <button onClick={() => setCurrentPage("Add")}>Add New Expense</button>
            <button onClick={() => setCurrentPage("List")}>View Expense List</button>
        </>
    );
};

export default Welcome;