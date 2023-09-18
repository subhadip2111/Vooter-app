// import React from "react";

// import { Link } from "react-router-dom";
// import Poll from "./Poll";

// function Body() {
//   return (
//     <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
//       <div className="container mx-auto text-center">
//         <h1 className="text-4xl font-semibold mb-8">
//           Welcome to Our Polling App!
//         </h1>
//         <Link
//           to="/allpolls"
//           className="text-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full inline-block transition duration-300 ease-in-out"
//         >
//           See Polls
//         </Link>
//       </div>

//       <div className="mt-8">
//         <h2 className="text-2xl font-semibold mb-4">All Polls</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      
//         </div>
//       </div>
// <Poll/>
//     </div>
//   );
// }

// export default Body;
import React from "react";
import { Link } from "react-router-dom";
import Poll from "./Poll";

function Body() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-semibold mb-8">
          Welcome to Our Polling App!
        </h1>
        <Link
          to="/allpolls"
          className="text-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full inline-block transition duration-300 ease-in-out"
        >
          See Polls
        </Link>
      </div>
      <div className="mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Poll />
         
          
        
        </div>
      </div>
    </div>
  );
}

export default Body;
