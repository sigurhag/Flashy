import React from "react";
import RegistrationForm from "../components/registration/RegistrationForm";

const Registration = ({isDarkMode}) => {
    return (
      <div className={isDarkMode ? 'dark-mode' : ''}>
          <RegistrationForm />
      </div>
    );
  };
  
  export default Registration;