import { NavLink } from "react-router-dom";
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

const NavBar = () => {
    return (
        <div className="bg-green-900 text-white w-lvw p-4 flex flex-row shadow-lg justify-center">
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuLink>
                        <NavLink to="/" className={({ isActive }) => (isActive ? "font-bold" : "")}>
                            <Button variant="ghost" asChild>
                                <span>Home</span>
                            </Button>
                        </NavLink>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuLink>
                        <NavLink to="/add" className={({ isActive }) => (isActive ? "font-bold" : "")}>
                            <Button variant="ghost" asChild>
                                <span>Add New Expense</span>
                            </Button>
                        </NavLink>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuLink>
                        <NavLink to="/list" className={({ isActive }) => (isActive ? "font-bold" : "")}>
                            <Button variant="ghost" asChild>
                                <span>View Expense List</span>
                            </Button>
                        </NavLink>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
        </div>
    );
};

export default NavBar;
