import React, { useState } from "react";
import { HiOutlineHome, HiOutlineTag, HiOutlineLogout } from "react-icons/hi";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const SidebarOne = () => {
  const [selected, setSelected] = useState("Overview");
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const location = useLocation();

  const handleItemClick = (label) => {
    if (selected === label) {
      setDropdownOpen(dropdownOpen === label ? null : label);
    } else {
      setSelected(label);
      setDropdownOpen(null); // Close dropdown when switching to a different main item
    }
  };

  return (
    <div className="fixed top-0 left-0 flex flex-col bg-dark text-light w-64 h-screen p-4 z-50">
      <nav className="space-y-10">
        <SidebarItem
          Icon={HiOutlineHome}
          label="Overview"
          link="/Overview"
          isActive={location.pathname === "/Overview"}
          handleItemClick={handleItemClick}
          selected={selected}
        />
        <SidebarItem
          Icon={HiOutlineTag}
          label="Reports"
          selected={selected}
          dropdownOpen={dropdownOpen}
          handleItemClick={handleItemClick}
          dropdownItems={[
            { label: "Add A Report", link: "/addreport" },
            { label: "Reports", link: "/reportView" },
          ]}
        />
      </nav>
      <button className="mt-auto bg-primary text-light rounded-full py-2 px-4 hover:bg-opacity-80 font-russo">
        Log Out
      </button>
    </div>
  );
};

const SidebarItem = ({
  Icon,
  label,
  link,
  selected,
  dropdownItems,
  dropdownOpen,
  handleItemClick,
}) => {
  const isSelected = selected === label;
  const isDropdownOpen = dropdownOpen === label;

  return (
    <motion.div
      whileHover={{
        borderColor: "#E76F51",
        transition: { duration: 0.3 },
      }}
      className={`relative flex flex-col cursor-pointer p-4 rounded-lg font-russo text-xl ${
        isSelected ? "border-2 border-primary" : "border-2 border-transparent"
      }`}
      onClick={() => handleItemClick(label)}
      initial={{ borderColor: "transparent" }}
      animate={{
        borderColor: isSelected ? "#E76F51" : "transparent",
        transition: { duration: 0.3 },
      }}
    >
      {link && !dropdownItems ? (
        <Link to={link}>
          <motion.div
            whileHover={{
              scale: 1.2,
              color: "#E76F51",
              transition: { duration: 0.3 },
            }}
            className={`flex items-center space-x-3 ${
              isSelected ? "text-primary" : "text-light"
            }`}
          >
            <Icon className="text-3xl" />
            <span>{label}</span>
          </motion.div>
        </Link>
      ) : (
        <motion.div
          whileHover={{
            scale: 1.2,
            color: "#E76F51",
            transition: { duration: 0.3 },
          }}
          className={`flex items-center space-x-3 ${
            isSelected ? "text-primary" : "text-light"
          }`}
        >
          <Icon className="text-3xl" />
          <span>{label}</span>
        </motion.div>
      )}

      {/* Dropdown Menu */}
      {dropdownItems && isDropdownOpen && (
        <div className="absolute left-full ml-2 bg-dark shadow-lg rounded-lg w-48 z-50">
          <ul className="py-2 space-y-2">
            {dropdownItems.map((item) => (
              <li
                key={item.label}
                className="px-4 py-2 hover:bg-primary hover:text-light rounded-lg"
              >
                <Link to={item.link}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
};

export default SidebarOne;
