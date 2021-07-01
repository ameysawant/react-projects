import React from "react";
import RecipeList from "./component/RecipeList";
import { list } from "./data";

const App = () => {
  return (
    <>
      <RecipeList data={list} />
    </>
  );
};

export default App;
