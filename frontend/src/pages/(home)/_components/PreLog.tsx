import React, { useState, useEffect } from "react";
import RegLoginForm from "./RegLoginForm";
import { isLogin } from "../..//../utils/auth" // Import the authentication check utility

const PreLog = () => {
  const [isFormOpen, setFormOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleJoinUsClick = () => {
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    
  };

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await isLogin();
      setIsAuthenticated(loggedIn.auth);
    };

    checkLoginStatus();
  }, []);

  
  if (isAuthenticated) {
    return (
      <div>
        <div>Welcome to your personal finance manager!</div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col bg-[#012527] pt-20 md:pt-28 pb-10 md:pb-26 px-4 sm:px-8 md:px-10 lg:px-20 gap-4 md:gap-8">
        <div className="NoContributorSegment p-8 flex flex-col md:flex-row bg-[#012E30] justify-between gap-8 md:gap-10 xl:gap-20 items-center">
          <div className="flex flex-col gap-2">
            <div className="text-[#C67F54] font-semibold">Hey there, </div>
            <div className="text-[#C67F54] font-semibold">
              Your personal finance manager, just a login away!
            </div>
            <div className="text-[#C8EAEE]">
              Our app is designed to simplify your financial journey by helping
              you track, manage, and analyze your expenses effortlessly. Whether
              it&apos;s daily spending or monthly budgeting, we've got you
              covered with a user-friendly interface and powerful features. Say
              goodbye to financial chaos and hello to smarter spending — all in
              one place!
            </div>
          </div>
          <div className="flex items-start w-[100%] md:w-auto">
            <button
              onClick={handleJoinUsClick}
              className="flex h-[46px] text-xl w-[120px] bg-[#C67F54] text-center hover:scale-95 items-center justify-center"
            >
              Join Now
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center bg-[#012E30] text-[#012527] text-[18vw] md:text-[15vw] font-bold w-[50vw] h-[50vw] md:w-[30vw] md:h-[30vw] rounded-full">
            $
          </div>
        </div>
        <RegLoginForm isOpen={isFormOpen} onClose={handleCloseForm} />
      </div>
    </>
  );
};

export default PreLog;
