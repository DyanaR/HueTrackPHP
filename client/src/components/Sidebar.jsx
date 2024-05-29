import React, { useContext } from "react";
import styled from "styled-components";
import Stats from "./Stats";
import Labels from "./Labels";
import GlobalContext from "../context/GlobalContext";
import { MdEdit } from "react-icons/md";

const Sidebar = () => {
  const { labelObject, title, active2, setActive2 } = useContext(GlobalContext);

  const showMenu = () => {
    setActive2(!active2);
  };

  return (
    <Container>
      <div className="sidebar-container">
        <div className="labels-container">
          <p style={{ fontSize: ".6rem", lineHeight: "100%" }}>Habit Name</p>
          <div className="habit-name">{title}</div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: ".8rem",
            }}
          >
            <h5>Labels</h5>
            <button style={{ float: "right" }} onClick={showMenu}>
              Edit
              <MdEdit />
            </button>
          </div>

          {labelObject?.map((iterator, index) => (
            <div className="labels-info" key={index}>
              <div>
                <div
                  style={{ backgroundColor: `${iterator?.colorCode}` }}
                  className="color-box"
                ></div>
              </div>
              <div className="color-name">
                {<p style={{ color: "black" }}>{iterator?.colorName || ""}</p>}
              </div>
            </div> 
          ))}
          
        </div>
        {/* <Labels /> */}
        <Stats />
      </div>
    </Container>
  );
};

export default Sidebar;

const Container = styled.div`
  .sidebar-container {
    padding: 0rem 1.3rem 0 2.5rem;
    background-color: var(--color-white);
    border-right: 2px solid var(--color-border);
    ${"" /* position: absolute; */}
    ${"" /* float: left; */}
    ${"" /* width: 18rem; */}
    top: 0px;
    bottom: 0px;
    ${"" /* height: 100%; */}
  }
  .title {
    margin-bottom: 1rem;
  }
  .habit-name {
    margin-bottom: 1.5rem;
    margin-top: 0.2rem;
    background-color: var(--color-input);
    height: 2rem;
    padding-left: 1rem;
    align-items: center;
    border-radius: 5px;
    display: flex;
  }
  .color-name {
    background-color: var(--color-input);
    width: 100%;
    border-radius: 5px;
    padding-left: 1rem;
  }
  .color-box {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 2px;
  }
  .label-container {
  }
  .labels-info {
    display: flex;
    gap: 1rem;
    margin-bottom: 0.5rem;
  }
  button {
    background-color: var(--color-white);
    color: var(--color-black);
    border-radius: 0.1rem;
    cursor: pointer;
    border: 1.5px solid var(--color-black);
    transition: var(--transition);
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    display: flex;
    justify-content: center;
    height: 1.5rem;
    width: max-content;
    padding: 0.2rem 0.4rem;
    gap: 0.3rem;
  }
  @media screen and (max-width: 1000px) {
    .color-name {
      width: 12rem;
    }
    .habit-name {
      width: 14.5rem;
    }
    .sidebar-container {
      padding: 0rem 1rem 0 2.5rem;
    }
  }
  @media screen and (max-width: 800px) {
    .sidebar-container {
      display: none;
    }
  }
`;