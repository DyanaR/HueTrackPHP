import React from 'react'

const LeftBoxes = () => {
  return (
    <div>
        <span
              className="boxes boxes-left"
              style={{
                backgroundColor: "var(--color-green)",
                marginTop: "32rem",
              }}
            ></span>
            <span
              className="boxes boxes-left"
              style={{
                backgroundColor: "var(--color-pink)",
                marginTop: "32rem",
                marginLeft: "8rem",
              }}
            ></span>
            <span
              className="boxes boxes-left"
              style={{
                backgroundColor: "var(--color-orange)",
                marginTop: "32rem",
                marginLeft: "16rem",
              }}
            ></span>
            <span
              className="boxes boxes-left"
              style={{
                backgroundColor: "var(--color-blue)",
                marginTop: "24rem",
              }}
            ></span>
            <span
              className="boxes boxes-left"
              style={{
                backgroundColor: "var(--color-purple)",
                marginTop: "24rem",
                marginLeft: "8rem",
              }}
            ></span>
            <span
              className="boxes boxes-left"
              style={{
                backgroundColor: "var(--color-red)",
                marginTop: "16rem",
              }}
            ></span>
    </div>
  )
}

export default LeftBoxes