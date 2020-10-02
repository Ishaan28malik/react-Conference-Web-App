import React, { useEffect, useState } from "react";
import Conference from "./components/Conference";
import Search from "./components/Search";
import axios from "axios";
import styles from "./index.css";

const CONFERENCE_API_URL =
  "https://o136z8hk40.execute-api.us-east-1.amazonaws.com/dev/get-list-of-conferences/?s=conf&s=aws&s=Developer&s=Conference";

const App = () => {
  const [list, setList] = useState([]);
  const [filterlist, setFilterList] = useState([]);
  const [free, setFree] = useState([]);
  const [paid, setPaid] = useState([]);
  // const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get(CONFERENCE_API_URL).then((res) => {
      setList(res.data.paid);
      setFree(res.data.free);
      setPaid(res.data.paid);
      /* By default the List will show Paid events */
      setFilterList(res.data.paid);
    });
  }, []);
  return (
    <div>
      <div>
        <h1 className={styles}>Developer Conference Hub</h1>
        <Search list={list} setFilterList={setFilterList} />
        <h3 className={styles}>Conference list</h3>
        <div
          // className={styles.buttons}
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "5px",
          }}
        >
          <button
            className={styles.button}
            onClick={() => {
              setFilterList(free);
            }}
          >
            Free
          </button>
          <button
            className={styles.button}
            onClick={() => {
              setFilterList(paid);
            }}
          >
            Paid
          </button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            margin: "50px",
            border: "5px solid",
            borderRadius: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              overflowX: "scroll",
              margin: "10px",
            }}
          >
            {filterlist.map((conference, index) => (
              <Conference
                key={`${index}-${conference.confName}`}
                conference={conference}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
