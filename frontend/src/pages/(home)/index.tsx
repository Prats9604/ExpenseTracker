import React, { useState, useEffect } from "react";
import Header from "./_components/Header";
import PreLog from "./_components/PreLog";
import PostLog from "./_components/PostLog";
import { isLogin } from "../../utils/auth";

import axios from "axios";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await isLogin();
      setIsAuthenticated(loggedIn.auth);
    };

    checkLoginStatus();
  }, []);
  return (
    <>
      <Header />
      <div className="flex flex-col bg-[#01191B] w-[100vw] min-h-screen">
        {/* {isAuthenticated ? <PostLog /> : <PreLog />} */}
        <PreLog/>
        <PostLog />
      </div>
    </>
  );
};

export default Home;
