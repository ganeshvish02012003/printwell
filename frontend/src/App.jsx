import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SummaryApi from "./common";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";

function App() {
  const dispatch = useDispatch()

  const fatchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: "include",
    });

    const dataApi = await dataResponse.json();
    // console.log("dataApi", dataApi);

    if(dataApi.success){
      dispatch(setUserDetails(dataApi.data))
    }
  };
  useEffect(() => {
    // user details
    fatchUserDetails();
  }, []);

  return (
    <>
      <div className="bg-slate-100  h-screen  rounded-xl">
        <Context.Provider 
          value={{
            fatchUserDetails, //user detail fetch
          }}
        >
          <ToastContainer />
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </Context.Provider>
      </div>
    </>
  );
}

export default App;
