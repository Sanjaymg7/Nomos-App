import React from "react";
import { doPOSTCall } from "../../DataFetch";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Button from "../Button";
import Input from "../Input";
import "./UserDataComponent.css";

const UserDataComponent = ({ renderSignupComponent, updateId }) => {
  const validateUser = (userDetails) => {
    if (userDetails.user_name.trim() === "") {
      alert("Please provide valid name");
      return false;
    } else if (
      userDetails.phone_no.trim() === "" ||
      userDetails.phone_no.length !== 13
    ) {
      alert("Please provide valid phone number (10 digits)");
      return false;
    } else if (
      userDetails.email.trim() === "" ||
      userDetails.email.match("^[a-zA-Z0-9+_.-]+@[a-zA-Z]+[.]+[a-zA-Z]+$") ===
        null
    ) {
      alert("Please provide valid email");
      return false;
    } else if (userDetails.password.trim() === "") {
      alert("Please provide valid password");
      return false;
    } else {
      return true;
    }
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const user_name = e.target[0].value;
    const phone_no = e.target[1].value.replace(/-/g, "").replace(/ /g, "");
    const email = e.target[2].value;
    const password = e.target[3].value;
    const userData = {
      user_name,
      phone_no,
      email,
      password,
      type: 2,
    };
    const isValidUser = validateUser(userData);
    if (isValidUser) {
      e.target[4].innerHTML = "Please Wait..";
      const data = await doPOSTCall("users/", userData);
      if (data) {
        updateId(data.user_id);
        renderSignupComponent(2);
      } else {
        e.target.innerHTML[4] = "Next";
      }
    }
  };

  return (
    <div className="comp1Container">
      <h3 className="comp1h3">Let's create an account</h3>
      <div className="inputContainer">
        <form onSubmit={formSubmitHandler}>
          <span className="comp1Text">Full Name</span>
          <Input type={"text"} className={"nameInput"} />
          <span className="comp1Text">Phone</span>
          <PhoneInput
            country={"in"}
            containerStyle={{
              margin: "0.5em 0em 1.6em",
            }}
            inputStyle={{
              width: "100%",
              border: "none",
              backgroundColor: "#eee",
            }}
          />
          <span className="comp1Text">Email</span>
          <Input type={"email"} className={"emailInput"} />
          <span className="comp1Text">Password</span>
          <Input type={"password"} className={"passwordInput"} />
          <div className="policyContainer">
            <span className="policyMessage">
              By continuing, I agree to the
              <br />
              <span className="textGreen">Terms and Conditions</span> and{" "}
              <span className="textGreen">Privacy Policy</span>
            </span>
          </div>
          <Button btnContent={"Next"} className={"signupOne"} />
        </form>
      </div>
    </div>
  );
};

export default UserDataComponent;
