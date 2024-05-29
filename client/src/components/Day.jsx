import dayjs from "dayjs";
import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

export default function Day({ day, rowIdx }) {
  const { statObject, setStatObject, labelObject } = useContext(GlobalContext);

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? "today" : "";
  }

  // add a default white color to the calendar ui 
  const labelObjectWithWhite = [
    ...labelObject, 
    {
      colorCode: "", // White color (empty string)
      colorName: "White", 
    },
  ];

  function extractColorIndex(colorCode) {
    let totalLength = labelObjectWithWhite.length;
    const currentIndex = labelObjectWithWhite.findIndex(
      (iterator) => iterator.colorCode === colorCode
    );
    return { currentIndex, totalLength };
  }

  function handleColorUpdate(originalDate, dateValue) {
    let colorValue = labelObjectWithWhite[0] || null;
    const hasColor = statObject[dateValue] || null;
    

    if (hasColor) {
      const { currentIndex, totalLength } = extractColorIndex(
        hasColor.colorCode
      );
      let newIndex;

      if (currentIndex === totalLength - 1) {
        newIndex = 0;
      } else {
        newIndex = currentIndex + 1;
      }
      colorValue = labelObjectWithWhite[newIndex] || null;
    }

    if (colorValue) {
      setStatObject((prevState) => ({
        ...prevState,
        [dateValue]: {
          id: uuidv4(),
          date: originalDate,
          colorCode: colorValue.colorCode,
          colorName: colorValue.colorName,
        },
      }));
    }
  }

  // function handleColorChanges (colorChange) {
  //   const modifiedArrays = statObject.map((iterator) => {
  //     if (labelObject.colorName === iterator.colorName) iterator.colorCode = colorChange;
  //     return iterator
  //   })
  //   setStatObject(modifiedArrays)
  // }

  function extractColorToDisplay() {
    const dateValue = day.format("MMMM-DD-YYYY").replaceAll("-", "");
    const hasColor = statObject[dateValue] || null;
    if (hasColor) return hasColor?.colorCode;
    return hasColor ? hasColor.colorCode : "";
  }

  function isDayClickable() {
    return day !== null; // Make the day unclickable if it is null
  }
  
  // console.log(statObject, labelObject)
  
  return (
    <Container>
    {isDayClickable() ? (
      <div
        onClick={() => {
          const originalDate = day.format("YYYY-MM-DD");
          const dateValue = day.format("MMMM-DD-YYYY").replaceAll("-", "");
          handleColorUpdate(originalDate, dateValue);
        }}
        style={{ backgroundColor: extractColorToDisplay(), cursor: "pointer" }}
        className="day-container"
      >
        <header>
          {/* {rowIdx === 0 && (
            <p className="weekday">
              {day.format("ddd").toUpperCase()}
            </p>
          )} */}
          <p className={`date ${getCurrentDayClass()}`}>{day.format("D")}</p>
        </header>
      </div>
    ) : (
      <div className="day-container unclickable">
        {/* Placeholder for non-clickable days */}
      </div>
    )}
  </Container>
  );
}

const Container = styled.div`
  .day-container {
    display: flex;
    flex-direction: column;
    width: 5rem;
    height: 5rem;
    border: 1px solid lightgrey;
    align-items: center;
    justify-content: center;
    user-select: none;

  }
  header {
    text-align: center;
  }
  .weekday {
    font-size: 0.9rem;
    margin-top: 0.25rem;
    color: var(--color-text-variant)
  }
  .date {
    font-size: 1.2rem;
    padding: 0.25rem;
    margin: 0.25rem 0;
    width: 1.5rem;
    text-align: center;
  }
  .today {
    color: var(--color-black);
    font-weight: 800;
  }


`;