'use client';

import { SafeUser } from "@/app/types";
import UserMenu from "./UserMenu";
import Link from "next/link";

interface NavbarProps {
    currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
    return (
        <div className="navbar bg-base-200">
            <div className="navbar-start">
                <Link href={!!currentUser ? '/meetings' : '/'}>
                    <h1 className="btn btn-ghost normal-case text-xl">My class</h1>
                </Link>
            </div>

            <UserMenu currentUser={currentUser} />
        </div>
    );
}


export default Navbar;