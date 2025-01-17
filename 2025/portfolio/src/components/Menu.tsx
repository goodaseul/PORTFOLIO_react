import { Link, useLocation } from "react-router-dom";

const Menu = () => {
    const location = useLocation();

    const menuArr = ["Home", "About", "Project"];
    console.log(location);
    return (
        <ul className="menus">
            {menuArr.map((item, index) => {
                const path = item === "Home" ? "/" : `/${item.charAt(0).toLowerCase() + item.slice(1)}`;
                const isActive = location.pathname === path;

                return (
                    <li key={index} className={isActive ? "active" : ""}>
                        <Link to={path} data-text={item}>
                            {item}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};

export default Menu;
