interface NavbarProps { }

const Navbar: React.FC<NavbarProps> = ({ }) => {
    return (
        <div className="navbar bg-base-200">
            <div className="navbar-start">
                <a className="btn btn-ghost normal-case text-xl">My class</a>
            </div>

            <div className="navbar-end">
                <label className="btn mr-2" htmlFor="modal-register">Sign up</label>
                <label className="btn" htmlFor="modal-login">Sign in</label>
            </div>
        </div>
    );
}


export default Navbar;