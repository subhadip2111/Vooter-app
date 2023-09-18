

import { Outlet, createBrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Body from "./components/Body";
import Registration from "./components/Registration";
import Allpolls from "./components/Allpolls";
import Poll from "./components/Poll";
const App = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};



 export const appRouter = createBrowserRouter([
   {
     path: "/",
     element: <App />,
     //  errorElement: <Error />,
     children: [
       {
         path: "/",
         element: <Body />,
         children: [{ path: "/", element: <Poll /> }],
       },

       { path: "/login", element: <Login /> },
       { path: "/register", element: <Registration /> },
       { path: "/allpolls", element: <Allpolls /> },
     ],
   },
 ]);
export default App;
