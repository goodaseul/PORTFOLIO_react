import { Link } from "react-router-dom";
import Menu from "./Menu";
const Header = () => {
    return (
        <header>
            <div className="full_inner">
                <h1>
                    <Link to="/">JEONG DASEUL</Link>
                </h1>
                <nav>
                    <Menu />
                </nav>
            </div>
        </header>
    );
};

export default Header;
