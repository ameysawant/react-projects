import React from "react";

const RecipeList = ({ data }) => {
  const [value, setValue] = React.useState(data);
  console.log(value);
  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-12">
            <h2 className="d-flex align-items-center mb-3">
              <span className="count mr-2">{value.length}</span>
              <span className="text">Products Found.</span>
            </h2>
          </div>
          {value.map((mylist) => {
            const { id, heading, img, price } = mylist;
            return (
              <div key={id} className="col-6 col-md-4 col-lg-3 mb-3">
                <img src={img} alt="" />
                <h2>{heading}</h2>
                <p>{price}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default RecipeList;
