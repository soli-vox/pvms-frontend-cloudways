import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import adminMenu from "../../menus/adminMenu";
import bankMenu from "../../menus/bankMenu";

const SideBar = ({ role, user }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current URL path
  const [expanded, setExpanded] = useState({});

  const menuItems = role === "admin" ? adminMenu : bankMenu;

  const toggleSubMenu = (index) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleNavigation = (path) => {
    if (path) navigate(path);
  };

  const filteredMenuItems = menuItems.filter((item) => {
    if (role === "bank" && user) {
      return true;
    }
    return true;
  });

  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4 flex-shrink-0">
      <h2 className="text-xl font-bold mb-6">
        {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
      </h2>
      <nav>
        <ul>
          {filteredMenuItems.length > 0 ? (
            filteredMenuItems.map((item, index) => (
              <li key={index} className="mb-4">
                {item.subItems ? (
                  <>
                    <button
                      onClick={() => toggleSubMenu(index)}
                      className={`w-full text-left flex items-center justify-between hover:text-gray-300 ${
                        location.pathname === item.path
                          ? "text-blue-400 font-semibold"
                          : ""
                      }`}
                    >
                      <span>
                        {item.icon && <span className="mr-2">{item.icon}</span>}
                        {item.title}
                      </span>
                      <span>{expanded[index] ? "▲" : "▼"}</span>
                    </button>
                    {expanded[index] && (
                      <ul className="ml-6 mt-2 space-y-2">
                        {item.subItems.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <button
                              onClick={() => handleNavigation(subItem.path)}
                              className={`text-sm hover:text-gray-300 ${
                                location.pathname === subItem.path
                                  ? "text-blue-400 font-semibold"
                                  : ""
                              }`}
                            >
                              {subItem.title}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full text-left flex items-center hover:text-gray-300 ${
                      location.pathname === item.path
                        ? "text-blue-400 font-semibold"
                        : ""
                    }`}
                  >
                    {item.icon && <span className="mr-2">{item.icon}</span>}
                    {item.title}
                  </button>
                )}
              </li>
            ))
          ) : (
            <li className="text-gray-400">No menu items available</li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
