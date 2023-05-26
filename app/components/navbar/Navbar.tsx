'use client';

import { SafeUser } from "@/app/types";
import UserMenu from "./UserMenu";

interface NavbarProps {
    currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
    return (
        <div className="navbar bg-base-200">
            <div className="navbar-start">
                <h1 className="btn btn-ghost normal-case text-xl">My class</h1>
            </div>

            <UserMenu currentUser={currentUser} />
        </div>
    );
}


export default Navbar;