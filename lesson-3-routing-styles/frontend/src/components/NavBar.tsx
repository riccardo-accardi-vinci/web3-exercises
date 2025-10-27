import { NavLink } from "react-router-dom";


const NavBar = () => {
    return (
        <nav className ="w-full bg-green-800 text-white shadow-md p-4 flex justify-center space-x-8">
            <NavLink to={"/"} className={({ isActive }) => (isActive ? 'font-bold' : '')}>Home</NavLink>
            <NavLink to={"/add"} className={({ isActive }) => (isActive ? 'font-bold' : '')}>Add New Expense</NavLink>
            <NavLink to={"/list"} className={({ isActive }) => (isActive ? 'font-bold' : '')}>View Expense List</NavLink>
        </nav>
    );
};

export default NavBar;
