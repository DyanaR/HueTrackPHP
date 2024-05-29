import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";
import { BsTrash } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";
import styled from "styled-components";
import { AiOutlinePlus } from "react-icons/ai";
import Dropdown from "./Dropdown";
import { v4 as uuidv4 } from "uuid";
import { NotificationManager } from "react-notifications";
import { UserAuth } from "../context/AuthContext";

export default function Labels() {
  const {
    // selectColor,
    daySelected,
    dispatchCalEvent,
    // selectedEvent,
    labels,
    labelObject,
    setlabelObject,
    statObject,
    title,
    setTitle
  } = useContext(GlobalContext);


  const handleLabelChange = (e, color) => {
    const { value } = e.target;
    const modifiedArray = labelObject.map((iterator) => {
      if (color.id === iterator.id) iterator.colorName = value;
      return iterator;
    });
    setlabelObject(modifiedArray);
  };

  const handleLabelAdd = () => {
    if (labelObject.length === 6) {
      NotificationManager.error("Label limit has been reached.", "Failure");
      return;
    }
    setlabelObject((prevState) => [
      ...prevState,
      {
        colorCode: "",
        colorName: "",
        id: uuidv4(),
        // count: 0,
      },
    ]);
  };

  const handleLabelRemove = (color) => {
    const { id } = color;
    const filteredColorArray = labelObject.filter(
      (iterator) => iterator.id !== id
    );
    setlabelObject(filteredColorArray);
  };

  const handleReset = () => {
    const resetLabels = labelObject.map((color) => ({
      ...color,
      colorName: "", 
      //colorCode: "",
    }));
    setlabelObject(resetLabels);
    setTitle("");
  };

    const { user } = UserAuth();

  // to fetch labels from monogodb for the logged-in user
  // const fetchLabels = async () => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:5000/labels/${user.uid}`
  //     );

  //     setlabelObject(response.data.labels);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  //   useEffect(() => {
  //   fetchLabels();
  // }, [user, setlabelObject]);

  return (
    <Container>
      <div className="habits-container">
        <button onClick={() => handleLabelAdd()}>
          <AiOutlinePlus />
          Add Color
        </button>
        <button onClick={handleReset}>Reset</button>
        <form className="habits-form">
          <input
            type="text"
            name="title"
            placeholder="Habit Title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="habit-info">
            {labelObject.map((color, index) => (
              <div key={index} className="labels">
                <div className="color-selection">
                  <Dropdown color={color} />
                </div>
                <input
                  type="text"
                  name="color-title"
                  placeholder="Color Title"
                  value={color.colorName}
                  required
                  onChange={(e) => handleLabelChange(e, color)}
                />
                {labelObject.length !== 1 && (
                  <div
                    className="remove"
                    type="button"
                    onClick={() => handleLabelRemove(color)}
                  >
                    <span>
                      <TiDelete style={{ cursor: "pointer" }} />
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <footer>
            {/* <button type="submit" onClick={handleSubmit}>
              Save
            </button> */}
          </footer>
        </form>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .color-selection {
    display: flex;
    align-items: center;
  }
  .remove {
    font-size: 1.5rem;
    display: flex;
    align-items: center;
  }
  .labels {
    display: flex;
    padding: 0.2rem, 0.5rem;
    gap: 0.5rem;
  }
  input {
    margin: 0.5rem 0;
  }
  input[type="text"] {
    padding-left: 1rem;
    border: none;
    height: 2rem;
    border-radius: 5px;
    ${'' /* background-color: var(--color-input); */}
    border: 1.5px solid #D7D7D7;
  }
  input:hover{
    border: 1.5px solid #1EACD6;
  }
  .buttons {
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
    height: auto;
    width: max-content;
    padding: 0.2rem 0.4rem;
    gap: 0.3rem;
  }
  ${
    "" /* button:hover {
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.1);
  } */
  }
`;