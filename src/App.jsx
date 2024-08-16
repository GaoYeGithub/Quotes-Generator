import React, { useEffect, useState } from "react";
import "./App.css";

const url = "https://type.fit/api/quotes";
let data;

export default function App() {
  const [quotes, setQuotes] = useState([]);
  const [num, setNum] = useState(0);
  const [likedQuotes, setLikedQuotes] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    getQuotes();
  }, []);

  useEffect(() => {
    const savedLikedQuotes = JSON.parse(localStorage.getItem("likedQuotes"));
    if (savedLikedQuotes) {
      setLikedQuotes(savedLikedQuotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("likedQuotes", JSON.stringify(likedQuotes));
  }, [likedQuotes]);

  async function getQuotes() {
    try {
      const res = await fetch(url);
      data = await res.json();
      console.log(data);
      setQuotes(data);
    } catch (err) {
      console.log(err);
    }
  }

  function next() {
    setNum(num + 1);
  }

  function previous() {
    setNum(num - 1);
  }

  function randomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setNum(randomIndex);
  }

  function likeQuote() {
    const likedQuote = quotes[num];
    setLikedQuotes([...likedQuotes, likedQuote]);
  }

  function dislikeQuote(index) {
    const updatedLikedQuotes = likedQuotes.filter((_, i) => i !== index);
    setLikedQuotes(updatedLikedQuotes);
  }

  function shareQuote() {
    const quote = quotes[num];
    const shareText = `"${quote.text}" - ${quote.author ? quote.author : "Anonymous"}`;
    navigator.share({
      title: "Quote",
      text: shareText,
    });
  }

  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }

  return (
    <div className={`App ${darkMode ? "dark-mode" : ""}`}>
      <h1 className="title">Quotes Generator</h1>
      <p className="quotes">{quotes[num] && quotes[num].text}</p>
      <p className="author">- {quotes[num] && quotes[num].author ? quotes[num].author : "Anonymous"}</p>
      <button className="button" disabled={num === 0} onClick={previous}>
        Previous
      </button>
      <button className="button" onClick={next}>
        Next
      </button>
      <button className="button" onClick={randomQuote}>
        🎲 Random
      </button>
      <button className="button" onClick={likeQuote}>
        ❤️ Like
      </button>
      <button className="button" onClick={shareQuote}>
        📤 Share
      </button>
      <button className="button" onClick={toggleDarkMode}>
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
      <div className="liked-quotes">
        <h2>Liked Quotes</h2>
        {likedQuotes.map((quote, index) => (
          <div key={index} className="liked-quote">
            <p className="quotes">{quote.text}</p>
            <p className="author">- {quote.author ? quote.author : "Anonymous"}</p>
            <button className="button" onClick={() => dislikeQuote(index)}>
              ❌ Dislike
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
