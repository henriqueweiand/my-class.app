interface NavbarProps { }

const Navbar: React.FC<NavbarProps> = ({ }) => {
    return (
        <div className="navbar bg-base-200">
            <div className="navbar-start">
                <a className="btn btn-ghost normal-case text-xl">My class</a>
            </div>

            <div className="navbar-end">
                <a className="btn mr-2">Sign up</a>
                <a className="btn">Sign in</a>
            </div>
        </div>
    );
}


export default Navbar;