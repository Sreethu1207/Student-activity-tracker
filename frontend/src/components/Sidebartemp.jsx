
import { useState } from "react";
import {FaHome,FaClipboardList,FaPlusCircle,FaChartBar,FaBars,FaTimes} from "react-icons/fa";

import "./Sidebar.css";

function Sidebar({ setActivePage }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const icons = {
        home: FaHome,
        activities: FaClipboardList,
        add: FaPlusCircle,
        summary: FaChartBar
    };

    const menuItems = [
        { name: "Dashboard", icon: "home" },
        { name: "Student Activities", icon: "activities" },
        { name: "Add Activity", icon: "add" },
        { name: "Summary", icon: "summary" }
    ];

    const handleClick = (page) => {
        setActivePage(page);
        setMenuOpen(false);
    };

    return (
        <>
            {/* Toggle Button */}
            <button
    className="menu-toggle"
    onClick={() => setMenuOpen(!menuOpen)}
>
    {menuOpen ? <FaTimes /> : <FaBars />}
</button>

            {menuOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={() => setMenuOpen(false)}
                />
            )}
            {/* Sidebar */}
            <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
                <h2 className="sidebar-title">Student Activity Tracker</h2>
                <nav>
                    {menuItems.map((item) => {
                        const Icon = icons[item.icon];

                        return (
                            <button
                                key={item.name}
                                className="sidebar-link"
                                onClick={() => handleClick(item.name)}
                            >
                                <Icon className="menu-icon" />
                                {item.name}
                            </button>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
}

export default Sidebar;
