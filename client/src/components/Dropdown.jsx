import React, { useContext, useState, useRef, useEffect } from "react";
import styled from "styled-components";
import GlobalContext from "../context/GlobalContext";
import { NotificationManager } from "react-notifications";
// import { BsCheck } from "react-icons/bs";
import { colours } from "../utils/calendar.js";

const Dropdown = (props) => {
  const { color } = props;
  const [expand, setExpand] = useState(false);
  const { setlabelObject, labelObject, statObject, setStatObject } =
    useContext(GlobalContext);

  const [previousColor, setPreviousColor] = useState(color.colorCode);
  const filteredColours = colours.filter((color) => color !== "");

  const handleColorChange = (newColor) => {
    const hasColor = labelObject.some(
      (iterator) => iterator.colorCode === newColor && iterator.colorCode !== ""
    );
    if (hasColor) {
      NotificationManager.error("This color is already in use", "Failure");
      return;
    }
    const modifiedArray = labelObject.map((iterator) => {
      if (color.id === iterator.id) iterator.colorCode = newColor;
      return iterator;
    });
    setlabelObject(modifiedArray);

    const updatedStatObject = { ...statObject };
    const keys = Object.keys(updatedStatObject);

    if (keys.length > 1) {
      for (let i = 1; i < keys.length; i++) {
        const key = keys[i];
        if (
          updatedStatObject[key].colorCode === previousColor &&
          previousColor !== ""
        ) {
          updatedStatObject[key].colorCode = newColor;
        }
      }
    }

    setStatObject(updatedStatObject);

    setPreviousColor(newColor);
  };

  // console.log(statObject, labelObject);

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setExpand(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <Container>
      <div className="menu">
        <div className="dropdown" ref={menuRef}>
          <button
            className="dropdown"
            type="button"
            onClick={() => {
              setExpand(!expand);
            }}
            style={{
              backgroundColor: color?.colorCode || "",
              height: "20px",
              width: "20px",
              borderRadius: "2px",
              cursor: "pointer",
            }}
          ></button>
          <div
            onClick={() => {
              setExpand(!expand);
            }}
            className={"dropdown-menu " + (expand ? "active" : "inactive")}
          >
            <div className="colors">
              {filteredColours.map((color, i) => (
                <span
                  key={i}
                  onClick={() => {
                    handleColorChange(color);
                  }}
                  style={{
                    backgroundColor: color,
                    height: "20px",
                    width: "20px",
                    borderRadius: "2px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  {/* {labelObject.colorCode === color && <BsCheck />} */}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Dropdown;

const Container = styled.div`
  .menu {
    display: flex;
    align-items: center;
    ${"" /* gap: 1rem; */}
  }
  .colors {
    padding: 0.5rem 0;
    gap: 0.5rem;
    padding: 0.5rem 0;
    display: grid;
    grid-template-columns: repeat(5, 0fr);
  }
  .dropdown{
    border: none;

  }
  button {
    border: none;
    cursor: pointer;
    appearance: none;
  }
  .dropdown-menu {
    position: absolute;
    display: flex;
    ${"" /* gap: 1rem; */}
    padding: 0.2rem .7rem;
    background-color: var(--color-white);
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }
  .dropdown-menu.active {
    visibility: visible;
    display: grid;
    grid-template-columns: repeat(5, 0fr);
  }
  .dropdown-menu.inactive {
    visibility: hidden;
  }
  button,
  a {
    width: 1.5rem;
    height: 1.5rem;
  }
`;