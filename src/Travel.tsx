import { useState } from "react";
import { useEffect } from "react";
import "./App.css";

const SERVER_URL = "http://localhost:9090/api/v1/";

async function getJokeWithRateLimit(event) {
  const URL = `${SERVER_URL}travellimited?about= + ${document.getElementById("about2").value}`;
  const requestBody = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      budget: document.getElementById("budget").value,
      start: document.getElementById("start").value,
      destination: document.getElementById("destination").value,
      month: document.getElementById("month").value,
      duration: document.getElementById("duration").value,
    }),
  };

  try {
    const response = await fetch(URL).then(handleHttpErrors);
    const result2 = document.getElementById("result2");
    result2.innerText = response.answer;
  } catch (e) {
    result2.innerText = e.message;
  }
}

async function handleHttpErrors(res) {
  if (!res.ok) {
    const errorResponse = await res.json();
    const msg = errorResponse.message ? errorResponse.message : "No error details provided";
    throw new Error(msg);
  }
  return res.json();
}

export default function Travel() {
  const [answer, setAnswer] = useState(null);

  const handleClick = (event) => {
    // Prevent the form from reloading the page.
    event.preventDefault();
    getJokeWithRateLimit().then((res) => setAnswer(res));
  };

  return (
    <div>
      <div>
        <h5>Get travel help</h5>

        <form id="form-joke2">
          <div>
            <label htmlFor="budget">Budget</label>
            <input type="text" id="budget" placeholder="What is your budget in DKK?" />
          </div>
          <div>
            <label htmlFor="start">Start Location</label>
            <input type="text" id="start" placeholder="Where are you planning to travel from?" />
          </div>
          <div>
            <label htmlFor="destination">Destination</label>
            <input type="text" id="destination" placeholder="Where do you want to visit? (Optional)" />
          </div>
          <div>
            <label htmlFor="month">When</label>
            <input type="text" id="month" placeholder="When would you like to travel? (Month)" />
          </div>
          <div>
            <label htmlFor="duration">Duration</label>
            <input type="text" id="duration" placeholder="For how long would you like to travel?" />
          </div>
          <div>
            <div>
              <button onClick={handleClick}>Get Joke</button>
              {answer && <p>{answer}</p>}
            </div>
          </div>
        </form>

        <div id="spinner2" role="status">
          <span>Loading...</span>
        </div>

        <p id="result2"></p>
      </div>
    </div>
  );
}
