import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/total-feeds`
      );
      const data = await response.json();
      setData(data.rss);
    };

    fetchData();
  }, []);

  const handleButtonClick = (buttonName) => {
    console.log(buttonName, "clicked");
    navigate(`/news/${buttonName}`);
  };

  return (
    <div className="App">
      {data.map((item, index) => (
        <div>
          <button
            className="btn btn-primary"
            key={index}
            onClick={() => handleButtonClick(item)}
          >
            {item}
          </button>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
