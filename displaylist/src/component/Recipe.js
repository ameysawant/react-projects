import React, { useState } from "react";

const Recipe = ({ data }) => {
  const [value, setValue] = useState(data);
  //   console.log(value);

  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-12 mb-3">
            <h2 className="d-flex align-items-center">
              <span className="count mr-2">{value.length}</span>
              <span className="text"> products found</span>
            </h2>
          </div>
          {value.map((recipes) => {
            const { id, heading, img, price } = recipes;
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

export default Recipe;
