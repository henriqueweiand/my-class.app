'use client';

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";

interface NavbarProps { }

const Navbar: React.FC<NavbarProps> = ({ }) => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    return (
        <div className="navbar bg-base-200">
            <div className="navbar-start">
                <a className="btn btn-ghost normal-case text-xl">My class</a>
            </div>

            <div className="navbar-end">
                <label className="btn mr-2" onClick={registerModal.onOpen}>Sign up</label>
                <label className="btn" onClick={loginModal.onOpen}>Sign in</label>
            </div>
        </div>
    );
}


export default Navbar;