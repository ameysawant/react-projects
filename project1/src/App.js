import React from "react";
import Recipe from "./component/Recipe";
import { list } from "./data";

const App = () => {
  return (
    <>
      <Recipe data={list} />
    </>
  );
};

export default App;
