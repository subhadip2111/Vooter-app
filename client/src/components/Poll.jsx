// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { addPoll } from "../store/auth/pollSlice";

// const Poll = () => {
//   const userToken = useSelector((state) => state.auth.token);
//   console.log("Token from create poll", userToken);

//   const [question, setQuestion] = useState("");
//   const [options, setOptions] = useState([""]);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleAddOption = () => {
//     setOptions([...options, ""]);
//   };

//   const handleRemoveOption = (index) => {
//     const updatedOptions = options.filter((_, i) => i !== index);
//     setOptions(updatedOptions);
//   };

//   const handleOptionChange = (index, value) => {
//     const updatedOptions = [...options];
//     updatedOptions[index] = value;
//     setOptions(updatedOptions);
//   };

//   const gotoGetPoll = () => {
//     navigate("/allpolls");
//   };

//   const handleCreatePoll = async () => {
  
//     console.log("handleCreatePoll");
//   const pollData = {
//     question,
//     options,
//   };
// console.log("Poll data:", pollData);
//   const api = "http://localhost:4000/api/v1/createpoll";

//   try {
//     const response = await fetch(api, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${userToken}`,
//       },
//       body: JSON.stringify(pollData),
//     });

//     console.log("Response status:", response.status); // Log response status


//     if (response.status === 201) {
//       const createdPoll = await response.json(); // Parse the response as JSON
//       console.log("Poll created successfully! Data:", createdPoll);
//       dispatch(addPoll(createdPoll));
//       navigate("/allpolls");
//     } else if (response.status === 401) {
//       console.error("Unauthorized access. Please log in again.");
//       // Handle unauthorized access, e.g., clear user data or redirect to login
//     } else {
//       console.error("Poll creation failed.");
//       // Handle other error cases here
//     }
//   } catch (error) {
//     console.error("An error occurred:", error);
//     // Handle unexpected errors here
//   }
// };
//   return (
//     <div className="container mx-auto mt-8 p-4">
//       <h2 className="text-3xl font-semibold mb-4">Create a Poll</h2>
//       <form onSubmit={handleCreatePoll} className="space-y-4">
//         <div className="flex flex-col">
//           <label htmlFor="question" className="text-lg font-medium">
//             Question:
//           </label>
//           <input
//             type="text"
//             id="question"
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}
//             required
//             className="p-2 border rounded focus:ring focus:ring-blue-300"
//           />
//         </div>
//         {options.map((option, index) => (
//           <div key={index} className="flex flex-col space-y-2">
//             <label htmlFor={`option-${index}`} className="text-lg font-medium">
//               Option {index + 1}:
//             </label>
//             <div className="flex space-x-2">
//               <input
//                 type="text"
//                 id={`option-${index}`}
//                 value={option}
//                 onChange={(e) => handleOptionChange(index, e.target.value)}
//                 required
//                 className="p-2 border rounded focus:ring focus:ring-blue-300 flex-grow"
//               />
//               <button
//                 type="button"
//                 onClick={() => handleRemoveOption(index)}
//                 className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
//               >
//                 Remove
//               </button>
//             </div>
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={handleAddOption}
//           className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//         >
//           Add Option
//         </button>
//         <button
//           onClick={gotoGetPoll}
//           type="submit"
//           className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
//         >
//           Create Poll
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Poll;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Poll = () => {

const navigate = useNavigate();

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([""]); // Initialize with one empty option
const userToken=localStorage.getItem("userToken")
  const handleAddOption = () => {
    // Add a new empty option
    setOptions([...options, ""]);
  };

  const handleRemoveOption = (index) => {
    // Remove an option by index
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
  };

  const handleOptionChange = (index, value) => {
    // Update the option value in the state
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const pollData = {
      question,
      options,
    };

    try {
  const response = await fetch("http://localhost:4000/api/v1/createpoll", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`, // Include the user token in the headers
    },
    body: JSON.stringify(pollData),
  });;

      if (response.status === 201) {
        console.log("Poll created successfully!");
 navigate("/allpolls");

      } else {
        console.error("Poll creation failed.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h2 className="text-3xl font-semibold mb-4">Create a Poll</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="question" className="text-lg font-medium">
            Question:
          </label>
          <input
            type="text"
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
            className="p-2 border rounded focus:ring focus:ring-blue-300"
          />
        </div>
        {options.map((option, index) => (
          <div key={index} className="flex flex-col space-y-2">
            <label htmlFor={`option-${index}`} className="text-lg font-medium">
              Option {index + 1}:
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                id={`option-${index}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                required
                className="p-2 border rounded focus:ring focus:ring-blue-300 flex-grow"
              />
              <button
                type="button"
                onClick={() => handleRemoveOption(index)}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddOption}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Option
        </button>
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Create Poll
        </button>
      </form>
    </div>
  );
};

export default Poll;
