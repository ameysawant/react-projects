import React, { useState, useEffect } from "react";
import Loading from "./components/Loading";
import Error from "./components/Error";
import Sorry from "./components/Sorry";

const API = "https://www.json-generator.com/api/json/get/bPOwENOZvm";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]);
  const [disable, setDisable] = useState(false);
  const cYear = new Date().getFullYear();
  const cMonth = new Date().getMonth();

  const getData = () => {
    fetch(API)
      .then((res) => {
        if (res.ok) {
          setLoading(false);
          return res.json();
        } else {
          setLoading(false);
          setError(true);
          throw Error("USERS NOT FOUND");
        }
      })
      .then((userList) => {
        setLoading(false);
        setUsers(userList);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);

  const todaysBirthday = () => {
    let currentMonth = users.filter((user) => user.month === cMonth + 1); //6
    // console.log(currentMonth);
    setUsers(currentMonth);
  };

  const reset = () => {
    getData();
    setDisable(false);
  };

  const clear = () => {
    setUsers([]);
    setDisable(true);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-xl-6 offset-xl-3 text-center bg-white py-4 border-bottom">
            <h1 className="text-info">{users.length} Birthday Found.</h1>
          </div>

          <div
            className={
              users.length === 0
                ? "col-xl-6 offset-xl-3 bg-white"
                : "scrollBar col-xl-6 offset-xl-3 bg-white"
            }
          >
            {users.length === 0 ? (
              <Sorry />
            ) : (
              users.map((user) => {
                const { id, name, email, phone, day, month, year, gender } =
                  user;
                return (
                  <div key={id} className="row py-3 border-bottom">
                    <div className="col">
                      <h6 className="text-info">{name}</h6>
                      <div>
                        <span className="text-muted">{day}-</span>
                        <span className="text-muted">{month}-</span>
                        <span className="text-muted">{year}</span>
                      </div>
                      <p className="text-muted">
                        i am {cYear - year} years old
                      </p>
                    </div>
                    <div className="col">
                      <p className="text-muted">{email}</p>
                      <p className="text-muted">{phone}</p>
                      <p className="text-muted">{gender}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="col-xl-6 offset-xl-3 text-center bg-white py-4 border-bottom">
            <button
              className="btn btn-info mr-3"
              disabled={disable}
              onClick={todaysBirthday}
            >
              Today's Birthday
            </button>
            <button className="btn btn-info mr-3" onClick={reset}>
              Get All Birthday
            </button>
            <button className="btn btn-info" disabled={disable} onClick={clear}>
              Clear
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
