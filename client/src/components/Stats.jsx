import React, { useContext } from "react";
import styled from "styled-components";
import GlobalContext from "../context/GlobalContext";

const Stats = () => {
  const { labelObject, statObject } = useContext(GlobalContext);

  function countByColorCode(colorCode) {
    const statArray = Object.values(statObject) || [];
    const filterArray = statArray.filter(
      (iterator) =>
        iterator.colorCode === colorCode &&
        //white color not counted
        iterator.colorCode !== ""
    );
    return filterArray?.length || 0;
  }

  return (
    <Container>
      <div className="stats">
        <h5 className="stats-title" style={{ marginBottom: ".81rem" }}>
          Stats
        </h5>
        <div className="info">
          {labelObject?.map((iterator, index) => (
            <div className="stats-info" key={index}>
              <h1 style={{ color: `${iterator?.colorCode}` }} className="count">
                {countByColorCode(iterator?.colorCode)}
              </h1>
              {<p className="color-title">{iterator?.colorName || ""}</p>}
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Stats;

const Container = styled.div`
  .stats {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    padding-bottom: 10rem;
  }
  .stats-info {
    background-color: var(--color-input);
    width: 5rem;
    height: 5rem;
    border-radius: 0.3125rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .color-title {
    font-size: 1rem;
    display: none;
  }
  .info {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
  }
  h2 {
    ${"" /* padding-top: 5rem; */}
    padding-bottom: 1rem;
  }
  p {
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .count {
    font-size: 1.875rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  @media screen and (max-width: 800px) {
    .stats-title {
      font-size: 1.3rem;
    }
    .stats {
      padding-bottom: 2rem;
    }
    .color-title {
      display: block;
    }
  }
`;