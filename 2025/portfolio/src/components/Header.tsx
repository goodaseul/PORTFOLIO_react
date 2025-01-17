import { Link } from "react-router-dom";
import Menu from "./Menu";

interface IRef {
    headerRef: React.RefObject<HTMLDivElement>;
}
const Header: React.FC<IRef> = ({ headerRef }) => {
    return (
        <header ref={headerRef}>
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
