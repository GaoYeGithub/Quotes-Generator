import React, { useEffect, useState } from "react";
import "./App.css";

const url = "https://type.fit/api/quotes";
let data;

export default function App() {
  const [quotes, setQuotes] = useState([]);
  const [num, setNum] = useState(0);
  const [likedQuotes, setLikedQuotes] = useState([]);

  useEffect(() => {
    getQuotes();
  }, []);

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

  function likeQuote() {
    const likedQuote = quotes[num];
    setLikedQuotes([...likedQuotes, likedQuote]);
  }

  function dislikeQuote(index) {
    const updatedLikedQuotes = likedQuotes.filter((_, i) => i !== index);
    setLikedQuotes(updatedLikedQuotes);
  }

  return (
    <div className="App">
      <h1 className="title">Quotes Generator</h1>
      <p className="quotes">{quotes[num] && quotes[num].text}</p>
      <p className="author">- {quotes[num] && quotes[num].author ? quotes[num].author : "Anonymous"}</p>
      <button className="button" disabled={num === 0} onClick={previous}>
        Previous
      </button>
      <button className="button" onClick={next}>
        Next
      </button>
      <button className="button" onClick={likeQuote}>
        ❤️ Like
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
