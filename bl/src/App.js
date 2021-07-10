import React, { useState, useEffect } from "react";
import PageNotFound from "./components/PageNotFound";
import Loading from "./components/Loading";
import Sorry from "./components/Sorry";
// import List from "./components/List";
const API = "https://www.json-generator.com/api/json/get/bPOwENOZvm";
// import { datalist } from "./db";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [users, setUsers] = useState([]);
  const [disable, setDisable] = useState(false);
  const cMonth = new Date().getMonth();
  const cYear = new Date().getFullYear();

  const getData = () => {
    fetch(API)
      .then((res) => {
        if (res.ok) {
          setLoading(false);
          return res.json();
        } else {
          setLoading(false);
          setErr(true);
          throw Error("DATA NOT FOUND");
        }
      })
      .then((userList) => {
        setLoading(false);
        setUsers(userList);
      })
      .catch((err) => console.log(err));
  };

  console.log(users);
  useEffect(() => {
    getData();
  }, []);

  const checkMonth = () => {
    let todayData = users.filter((user) => user.month === cMonth + 1);
    if (todayData.length === 0) {
      setUsers([]);
    } else {
      setUsers(todayData);
    }
  };

  const clearData = () => {
    if (users.length !== 0) {
      setUsers([]);
      setDisable(true);
    } else {
      setUsers(users);
      setDisable(false);
    }
  };

  const resetData = () => {
    getData();
    setDisable(false);
  };

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }
  if (err) {
    return (
      <>
        <PageNotFound />
      </>
    );
  }
  return (
    <>
      <div className="container mt-3">
        <div className="row flex-column">
          <div className="col-xl-6 offset-xl-3 text-center bg-white py-4 border-bottom">
            <h1 className="text-info">{users.length} Birthday Found.</h1>
          </div>
          <div
            className={
              users.length === 0
                ? "col-xl-6 offset-xl-3"
                : "scrollBar col-xl-6 offset-xl-3"
            }
          >
            {users.length === 0 ? (
              <Sorry />
            ) : (
              users.map((user) => {
                const { id, name, email, phone, day, month, year, gender } =
                  user;
                return (
                  <div key={id} className="row bg-white py-2 border-bottom">
                    <div className="col">
                      <h6 className="text-info">{name}</h6>
                      <div className="text-muted">
                        <span>{day}-</span>
                        <span>{month}-</span>
                        <span>{year}</span>
                      </div>
                      <p className="text-muted" className="text-muted">
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
          <div className="col-xl-6 offset-xl-3 text-center bg-white py-4 border-top">
            <button
              className="btn btn-info mr-3"
              disabled={disable}
              onClick={checkMonth}
            >
              Today's Birthday
            </button>
            <button className="btn btn-info mr-3" onClick={resetData}>
              Get All User's Birthday
            </button>
            <button
              className="btn btn-info"
              disabled={disable}
              onClick={clearData}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
