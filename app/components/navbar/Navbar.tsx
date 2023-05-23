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
                <a className="btn btn-ghost normal-case text-xl">My class</a>
            </div>

            <UserMenu currentUser={currentUser} />
        </div>
    );
}


export default Navbar;