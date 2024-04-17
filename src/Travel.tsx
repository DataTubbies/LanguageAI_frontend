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
      <div className="grid md:grid-cols-1 mx-20">
        <form className="space-y-3 w-full mt-5 text-center" id="form-joke2">
          <h1 className="font-mono text-2xl font-bold text-black-900">🤖Your AI travel helper🤖</h1>
          <div>
            <label htmlFor="budget" className="font-mono">
              What is your budget in DKK?
            </label>
            <br />
            <input className="font-mono mt-1 w-1/3 text-center rounded-md border border-black-950 focus:ring-astronaut-blue-500 focus:border-astronaut-blue-500 drop-shadow-xl" type="number" id="budget" required />
          </div>
          <div>
            <label htmlFor="start" className="font-mono">
              Where are you planning to travel from?
            </label>
            <br />
            <input className="font-mono mt-1 w-1/3 text-center rounded-md border border-black-950 focus:ring-astronaut-blue-500 focus:border-astronaut-blue-500 drop-shadow-xl" type="text" id="start" required />
          </div>
          <div>
            <label htmlFor="destination" className="font-mono">
              Where do you want to visit? (Optional)
            </label>
            <br />
            <input className="font-mono mt-1 w-1/3 text-center rounded-md border border-black-950 focus:ring-astronaut-blue-500 focus:border-astronaut-blue-500 drop-shadow-xl" type="text" id="destination" />
          </div>
          <div>
            <label htmlFor="month" className="font-mono">
              When would you like to travel (Month)
            </label>
            <br />
            <input className="font-mono mt-1 w-1/3 text-center rounded-md border border-black-950 focus:ring-astronaut-blue-500 focus:border-astronaut-blue-500 drop-shadow-xl" type="text" id="month" required />
          </div>
          <div>
            <label htmlFor="month" className="font-mono">
              For how long would you like to travel? (Days)
            </label>
            <br />
            <input className="font-mono mt-1 w-1/3 text-center rounded-md border border-black-950 focus:ring-astronaut-blue-500 focus:border-astronaut-blue-500 drop-shadow-xl " type="number" id="duration" required />
          </div>
          <div>
            <button className="bg-astronaut-blue-500 rounded-md w-1/5 border border-astronaut-blue-50 text-black-50" onClick={handleClick}>
              Get Travel Suggestions!
            </button>
            {answer && <p className="text-black-50">{answer}</p>}
          </div>
        </form>

        <p className="text-black-50" id="result2"></p>
      </div>
    </div>
  );
}
