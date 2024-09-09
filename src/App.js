import React, { useState, useEffect, useRef } from 'react';
import './App.css'; // Include your CSS styles here

const Menu = () => {
  const bgColorsBody = ["#ffb457", "#ff96bd", "#9999fb", "#ffe797", "#cffff1"];
  const [activeIndex, setActiveIndex] = useState(0); // Manage active menu item index
  const menuRef = useRef(null); // Reference for the menu element
  const menuBorderRef = useRef(null); // Reference for the menu border
  const bodyRef = useRef(document.body); // Reference to the body to change the background color

  useEffect(() => {
    const menu = menuRef.current;
    const menuBorder = menuBorderRef.current;
    const activeItem = menu.querySelectorAll(".menu__item")[activeIndex];
    
    // Change body background color when active item changes
    bodyRef.current.style.backgroundColor = bgColorsBody[activeIndex];

    // Offset menu border position
    offsetMenuBorder(activeItem, menu, menuBorder);

    // Adjust the menu border on window resize
    const handleResize = () => {
      offsetMenuBorder(activeItem, menu, menuBorder);
      menu.style.setProperty("--timeOut", "none");
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [activeIndex]);

  const offsetMenuBorder = (element, menu, menuBorder) => {
    const offsetActiveItem = element.getBoundingClientRect();
    const left = Math.floor(
      offsetActiveItem.left - menu.offsetLeft - (menuBorder.offsetWidth - offsetActiveItem.width) / 2
    ) + "px";
    menuBorder.style.transform = `translate3d(${left}, 0 , 0)`;
  };

  return (
    <menu className="menu" ref={menuRef}>
      {["#ff8c00", "#f54888", "#4343f5", "#e0b115", "#65ddb7"].map((color, index) => (
        <button
          key={index}
          className={`menu__item ${index === activeIndex ? "active" : ""}`}
          style={{ "--bgColorItem": color }}
          onClick={() => setActiveIndex(index)}
        >
          <svg className="icon" viewBox="0 0 24 24">
            {index === 0 && (
              <>
                <path d="M3.8,6.6h16.4" />
                <path d="M20.2,12.1H3.8" />
                <path d="M3.8,17.5h16.4" />
              </>
            )}
            {index === 1 && (
              <>
                <path
                  d="M6.7,4.8h10.7c0.3,0,0.6,0.2,0.7,0.5l2.8,7.3c0,0.1,0,0.2,0,0.3v5.6c0,0.4-0.4,0.8-0.8,0.8H3.8
                  C3.4,19.3,3,19,3,18.5v-5.6c0-0.1,0-0.2,0.1-0.3L6,5.3C6.1,5,6.4,4.8,6.7,4.8z"
                />
                <path d="M3.4,12.9H8l1.6,2.8h4.9l1.5-2.8h4.6" />
              </>
            )}
            {index === 2 && (
              <>
                <path d="M3.4,11.9l8.8,4.4l8.4-4.4" />
                <path d="M3.4,16.2l8.8,4.5l8.4-4.5" />
                <path d="M3.7,7.8l8.6-4.5l8,4.5l-8,4.3L3.7,7.8z" />
              </>
            )}
            {index === 3 && (
              <>
                <path
                  d="M5.1,3.9h13.9c0.6,0,1.2,0.5,1.2,1.2v13.9c0,0.6-0.5,1.2-1.2,1.2H5.1c-0.6,0-1.2-0.5-1.2-1.2V5.1
                  C3.9,4.4,4.4,3.9,5.1,3.9z"
                />
                <path d="M4.2,9.3h15.6" />
                <path d="M9.1,9.5v10.3" />
              </>
            )}
            {index === 4 && (
              <>
                <path
                  d="M5.1,3.9h13.9c0.6,0,1.2,0.5,1.2,1.2v13.9c0,0.6-0.5,1.2-1.2,1.2H5.1c-0.6,0-1.2-0.5-1.2-1.2V5.1
                  C3.9,4.4,4.4,3.9,5.1,3.9z"
                />
                <path d="M5.5,20l9.9-9.9l4.7,4.7" />
                <path
                  d="M10.4,8.8c0,0.9-0.7,1.6-1.6,1.6c-0.9,0-1.6-0.7-1.6-1.6C7.3,8,8,7.3,8.9,7.3C9.7,7.3,10.4,8,10.4,8.8z"
                />
              </>
            )}
          </svg>
        </button>
      ))}

      <div className="menu__border" ref={menuBorderRef}></div>
    </menu>
  );
};

export default Menu;
