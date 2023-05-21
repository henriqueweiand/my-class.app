'use client';

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { SafeUser } from "@/app/types";

interface NavbarProps {
    currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    return (
        <div className="navbar bg-base-200">
            <div className="navbar-start">
                <a className="btn btn-ghost normal-case text-xl">My class</a>
            </div>

            {
                currentUser ? (
                    <div className="navbar-end">
                        <label className="btn mr-2" onClick={registerModal.onOpen}>Create room</label>
                        <label className="btn" onClick={loginModal.onOpen}>Log off</label>
                    </div>
                ) : (
                    <div className="navbar-end">
                        <label className="btn mr-2" onClick={registerModal.onOpen}>Sign up</label>
                        <label className="btn" onClick={loginModal.onOpen}>Sign in</label>
                    </div>
                )
            }


        </div>
    );
}


export default Navbar;