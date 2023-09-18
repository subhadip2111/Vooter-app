import React, { useEffect, useState, useCallback } from "react";
//import { useSelector } from "react-redux";
//import { useSelector } from "react-redux";

const Allpolls = () => {
 
  const [polls, setPolls] = useState([]);
//const [userToken, setUserToken] = useState("");
  //const userToken = useSelector((state) => state.auth.token);

 const userToken =localStorage.getItem("userToken")
    
  const handleGetAllPolls = useCallback(async () => {
    try {
    
 console.log("storedToken from All-poll", userToken);
      const response = await fetch("http://localhost:4000/api/v1/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        setPolls(data);
      } else {
        console.error(`Failed to fetch polls. Status: ${response.status}`);
        let errorMessage = "Unknown error";

        try {
          const errorData = await response.json();
          if (errorData && errorData.error) {
            errorMessage = errorData.error;
          }
        } catch (error) {
          console.error("Unable to parse error message from JSON.");
        }

        console.error(`Error message: ${errorMessage}`);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }, [userToken]);

  useEffect(() => {
    handleGetAllPolls();
  }, [handleGetAllPolls]);

  return (
    <div className="container mx-auto mt-8 p-4 bg-slate-500">
      <h2 className="text-3xl font-semibold mb-4 bg-slate-500">All Polls</h2>
      <ul className="space-y-4">
        {polls.map((poll) => (
          <li
            key={poll._id}
            className="border p-4 rounded-lg hover:shadow-md transition duration-300 ease-in-out cursor-pointer hover:bg-pink-700"
          >
            <h3 className="text-xl font-semibold mb-2">{poll.question}</h3>
            <ul>
              {poll.options.map((option, index) => (
                <li key={index} className="mb-2">
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:ring focus:ring-blue-300"
                    // onClick={() => handleVote(poll._id, index)}
                  >
                    {option.option}
                  </button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Allpolls;
