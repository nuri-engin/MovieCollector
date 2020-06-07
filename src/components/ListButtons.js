import React, { useState } from "react";
import { Button } from "react-bootstrap";

const btnStyle = {
  margin: 5,
  background: "transparent",
  padding: 2,
  fontSize: 11,
  color: "#105fa6",
  fontWeight: "bold",
  width: "60px",
  borderColor: " rgb(16, 95, 166)",
  height: "21px",
};

const createListButton = (title) => (
  <Button style={btnStyle} variant="warning" size="sm">
    {title}
  </Button>
);

function ListButtons() {
  return (
    <div>
      {createListButton("LIST")}
      {createListButton("EXPORT")}
      {createListButton("IMPORT")}
    </div>
  );
}

export default ListButtons;
