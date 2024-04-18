import { useState } from "react";

const SERVER_URL = "http://localhost:9090/api/v1/";

async function handleHttpErrors(res) {
  if (!res.ok) {
    const errorResponse = await res.json();
    const msg = errorResponse.message
      ? errorResponse.message
      : "No error details provided";
    throw new Error(msg);
  }
  return res.json();
}

type Travel = {
  budget: number;
  numberOfPeople: number;
  startingLocation: string;
  destination: string;
  month: string;
  duration: number;
};

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
      numberOfPeople: parseInt(data.numberOfPeople),
      startingLocation: data.startingLocation,
      destination: data.destination,
      month: data.month,
      duration: parseInt(data.duration),
    };

    getTravelWithRateLimit(newTravel);

    async function getTravelWithRateLimit(travel: Travel) {
      const URL = `${SERVER_URL}travellimited`;
      const requestBody = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          budget: travel.budget,
          numberOfPeople: travel.numberOfPeople,
          startingLocation: travel.startingLocation,
          destination: travel.destination,
          month: travel.month,
          duration: travel.duration,
        }),
      };

      try {
        console.log(requestBody);
        const response = await fetch(URL, requestBody).then(handleHttpErrors);
        setAnswer(response.answer);
        document.getElementById("answerText2").innerHTML = response.answer;
      } catch (error) {
        setErr(error);
      }
    }

    setErr(null);
    console.log(err);
  };

  return (
    <div className="grid grid-cols-2">
      <div className="grid md:grid-cols-1 mx-auto md:mx-20">
        <form
          className="space-y-3 w-full mt-5 text-center"
          id="form-joke2"
          onSubmit={handleClick}
        >
          <h1 className="font-mono text-2xl font-bold text-black-900">
            🤖Your AI travel helper🤖
          </h1>
          <p className="font-mono text-lg font-bold text-black-900">
            Let's plan your next trip! 🌍
          </p>
          <div>
            <label htmlFor="budget" className="font-mono">
              What is your budget in DKK?
            </label>
            <br />
            <input
              className="font-mono mt-1 w-1/3 text-center rounded-md border border-black-950 focus:ring-astronaut-blue-500 focus:border-astronaut-blue-500 drop-shadow-xl"
              type="number"
              name="budget"
              id="budget"
              required
            />
          </div>
          <div>
            <label htmlFor="numberOfPeople" className="font-mono">
              How many people are traveling?
            </label>
            <br />
            <input
              className="font-mono mt-1 w-1/3 text-center rounded-md border border-black-950 focus:ring-astronaut-blue-500 focus:border-astronaut-blue-500 drop-shadow-xl"
              type="number"
              name="numberOfPeople"
              id="numberOfPeople"
              required
            />
          </div>
          <div>
            <label htmlFor="startingLocation" className="font-mono">
              Where are you planning to travel from?
            </label>
            <br />
            <input
              className="font-mono mt-1 w-1/3 text-center rounded-md border border-black-950 focus:ring-astronaut-blue-500 focus:border-astronaut-blue-500 drop-shadow-xl"
              type="text"
              name="startingLocation"
              id="startingLocation"
              required
            />
          </div>
          <div>
            <label htmlFor="destination" className="font-mono">
              Where do you want to visit? (Leave blank for a suggestion)
            </label>
            <br />
            <input
              className="font-mono mt-1 w-1/3 text-center rounded-md border border-black-950 focus:ring-astronaut-blue-500 focus:border-astronaut-blue-500 drop-shadow-xl"
              type="text"
              name="destination"
              id="destination"
            />
          </div>
          <div>
            <label htmlFor="month" className="font-mono">
              When would you like to travel (Month)
            </label>
            <br />
            <input
              className="font-mono mt-1 w-1/3 text-center rounded-md border border-black-950 focus:ring-astronaut-blue-500 focus:border-astronaut-blue-500 drop-shadow-xl"
              type="text"
              name="month"
              id="month"
              required
            />
          </div>
          <div>
            <label htmlFor="month" className="font-mono">
              For how long would you like to travel? (Days)
            </label>
            <br />
            <input
              className="font-mono mt-1 w-1/3 text-center rounded-md border border-black-950 focus:ring-astronaut-blue-500 focus:border-astronaut-blue-500 drop-shadow-xl "
              type="number"
              name="duration"
              id="duration"
              required
            />
          </div>
          <div>
            <div className="flex flex-wrap justify-center gap-6">
              <button
                type="submit"
                className="font-mono relative inline-block h-full w-full rounded border-2 border-black bg-white px-3 py-1 text-base font-bold text-black transition duration-100 hover:bg-yellow-400 hover:text-gray-900"
              >
                Get Suggestions 🚀
              </button>
            </div>
          </div>
        </form>
      </div>
      <div>
        <br></br>
        <br></br>

        <p
          id="answerText2"
          className="font-mono text-sm font-bold text-black-900"
        ></p>
        {answer && (
          <p
            id="answerText"
            className="font-mono text-sm font-bold text-black-900"
          ></p>
        )}
      </div>
    </div>
  );
}
