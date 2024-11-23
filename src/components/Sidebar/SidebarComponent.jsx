import React, { useState } from "react";
import "./SidebarStyles.css";
import { Link } from "react-router-dom";
import { FiBox } from "react-icons/fi";
import { AiOutlineFileText } from "react-icons/ai";
import { MdHistory } from "react-icons/md";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

const SidebarComponent = () => {
  const [isStockMenuOpen, setIsStockMenuOpen] = useState(false);

  const toggleStockMenu = () => {
    setIsStockMenuOpen(!isStockMenuOpen);
  };

  return (
    <aside className="aside">
      <h2>Warehouse</h2>
      <div className="list-menu">
        <ul>
          <li>
            <Link to={"/"}>
              <FiBox /> Product
            </Link>
          </li>
          <li>
            <button className="menu-button" onClick={toggleStockMenu}>
              <AiOutlineFileText /> Stock{" "}
              {isStockMenuOpen ? <BiChevronUp /> : <BiChevronDown />}
            </button>
            {isStockMenuOpen && (
              <ul className="submenu">
                <li>
                  <Link to={"/stock/in"}>Stock In</Link>
                </li>
                <li>
                  <Link to={"/stock/out"}>Stock Out</Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link to={"/logs"}>
              <MdHistory /> Logs
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SidebarComponent;
