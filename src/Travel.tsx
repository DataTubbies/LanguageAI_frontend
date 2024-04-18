import { useState } from "react";
import { useEffect } from "react";
import "./App.css";

const SERVER_URL = "http://localhost:9090/api/v1/";

async function getTravelWithRateLimit(travel: Travel) {
  const URL = `${SERVER_URL}travel`;
  const requestBody = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      budget: travel.budget,
      startLocation: travel.startLocation,
      destination: travel.destination,
      month: travel.month,
      duration: travel.duration,
    }),
  };

  try {
    console.log(requestBody);
    const response = await fetch(URL, requestBody).then(handleHttpErrors);
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

type Travel = { budget: number; startLocation: string; destination: string; month: string; duration: number };

export default function Travel() {
  const [answer, setAnswer] = useState(null);
  const [err, setErr] = useState(null);

  const handleClick = (event: React.FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    console.log(formData);

    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString(); // Convert all values to strings
    });

    const newTravel: Travel = {
      budget: parseInt(data.budget),
      startLocation: data.startingLocation,
      destination: data.destination,
      month: data.month,
      duration: parseInt(data.duration),
    };

    getTravelWithRateLimit(newTravel);

    setErr(null);
    console.log(err);
  };

  return (
    <div>
      <div className="grid md:grid-cols-1 mx-20">
        <form className="space-y-3 w-full mt-5 text-center" id="form-joke2" onSubmit={handleClick}>
          <h1 className="font-mono text-2xl font-bold text-black-900">🤖Your AI travel helper🤖</h1>
          <div>
            <label htmlFor="budget" className="font-mono">
              What is your budget in DKK?
            </label>
            <br />
            <input
              name="budget"
              className="font-mono mt-1 w-1/3 text-center rounded-md border border-black-950 focus:ring-astronaut-blue-500 focus:border-astronaut-blue-500 drop-shadow-xl"
              type="number"
              id="budget"
              required
            />
          </div>
          <div>
            <label htmlFor="startingLocation" className="font-mono">
              Where are you planning to travel from?
            </label>
            <br />
            <input
              name="startingLocation"
              className="font-mono mt-1 w-1/3 text-center rounded-md border border-black-950 focus:ring-astronaut-blue-500 focus:border-astronaut-blue-500 drop-shadow-xl"
              type="text"
              id="startingLocation"
              required
            />
          </div>
          <div>
            <label htmlFor="destination" className="font-mono">
              Where do you want to visit? (Optional)
            </label>
            <br />
            <input
              name="destination"
              className="font-mono mt-1 w-1/3 text-center rounded-md border border-black-950 focus:ring-astronaut-blue-500 focus:border-astronaut-blue-500 drop-shadow-xl"
              type="text"
              id="destination"
            />
          </div>
          <div>
            <label htmlFor="month" className="font-mono">
              When would you like to travel (Month)
            </label>
            <br />
            <input
              name="month"
              className="font-mono mt-1 w-1/3 text-center rounded-md border border-black-950 focus:ring-astronaut-blue-500 focus:border-astronaut-blue-500 drop-shadow-xl"
              type="text"
              id="month"
              required
            />
          </div>
          <div>
            <label htmlFor="duration" className="font-mono">
              For how long would you like to travel? (Days)
            </label>
            <br />
            <input
              name="duration"
              className="font-mono mt-1 w-1/3 text-center rounded-md border border-black-950 focus:ring-astronaut-blue-500 focus:border-astronaut-blue-500 drop-shadow-xl "
              type="number"
              id="duration"
              required
            />
          </div>
          <div>
            <button type="submit" className="bg-astronaut-blue-500 rounded-md w-1/5 border border-astronaut-blue-50 text-black-50">
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
