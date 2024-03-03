import React, { useState, useEffect, useRef } from "react";
import axios from "axios"; // You'll need to install axios
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useParams } from "react-router-dom";

function NewsDetails() {
  const [newsData, setNewsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [start, setStart] = useState(0); // For pagination
  const [end, setEnd] = useState(2); // For pagination
  const { category } = useParams();
  const audioRef = useRef(null);

  const fetchNews = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/news-send/${category}/${start}/${end}`
      );
      console.log("data", response.data);
      let oldData = newsData;
      if (oldData) {
        oldData.data = { ...oldData.data, ...response.data.data };
      } else {
        oldData = response.data;
      }
      setNewsData(oldData);
      console.log("newsData", newsData);
    } catch (error) {
      setError(error); // Handle error appropriately
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = async () => {
    setStart(start + 2);
    setEnd(end + 2);
    fetchNews();
  };

  const handlePlayAudio = async (category, date) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/news-audio/${category}/${date}`,
        {
          responseType: "blob", // Get the audio as a blob
        }
      );

      // Create an audio source from the blob
      const audioBlob = new Blob([response.data], { type: "audio/mpeg" }); // Adjust content type if needed
      const audioURL = URL.createObjectURL(audioBlob);

      audioRef.current.src = audioURL; // Set the audio source
      audioRef.current.play(); // Play the audio
    } catch (error) {
      console.error("Error playing audio", error);
      // Handle the error appropriately
    }
  };

  useEffect(() => {
    fetchNews();
  }, [start, end]); // Refetch when start and end change

  return (
    <div>
      {isLoading && <p>Loading News...</p>}
      {error && <p>Error fetching news: {error.message}</p>}

      {newsData && (
        <div>
          {Object.entries(newsData.data).map(([date, news]) => (
            <div key={date}>
              <button onClick={() => handlePlayAudio(category, date)}>
                {" "}
                <img
                  src="/speaker.png"
                  alt="Speaker"
                  className="speaker-image"
                />
              </button>
              <h3 className="DateClass">{date}</h3>
              <p className="NEWSClass">{news}</p>
            </div>
          ))}
          <button
            onClick={() => (window.location.href = "/")}
            className="btn btn-success"
          >
            Back
          </button>
          <button
            onClick={loadMore}
            className="btn btn-primary" // Or any styling you want
          >
            Load More
          </button>
          <audio ref={audioRef} /> {/* This audio element is hidden */}
        </div>
      )}
    </div>
  );
}

export default NewsDetails;
