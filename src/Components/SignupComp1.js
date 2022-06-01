import React, { useState } from "react";
// import PhoneInput from "react-phone-number-input";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Button from "./Button";
import Input from "./Input";
import "./SignupComp1.css";

const SignupComp1 = (props) => {
  const [userDetails, setUserDetails] = useState({
    user_name: "",
    phone_no: "",
    email: "",
    password: "",
    type: 2,
  });

  const handleNameChange = (val) => {
    setUserDetails((prevState) => {
      return { ...prevState, user_name: val };
    });
  };

  const handlePhoneChange = (val) => {
    setUserDetails((prevState) => {
      return { ...prevState, phone_no: val };
    });
  };

  const handleEmailChange = (val) => {
    setUserDetails((prevState) => {
      return { ...prevState, email: val };
    });
  };

  const handlePasswordChange = (val) => {
    setUserDetails((prevState) => {
      return { ...prevState, password: val };
    });
  };

  const btnClickHandler = () => {
    if (userDetails.user_name.trim() === "") {
      alert("Please provide valid name");
    } else if (
      userDetails.phone_no.trim() === "" ||
      userDetails.phone_no.length !== 12
    ) {
      alert("Please provide valid phone number (10 digits)");
    } else if (
      userDetails.email.trim() === "" ||
      userDetails.email.match("^[a-zA-Z0-9+_.-]+@[a-zA-Z]+[.]+[a-zA-Z]+$") ===
        null
    ) {
      alert("Please provide valid email");
    } else if (userDetails.password.trim() === "") {
      alert("Please provide valid password");
    } else {
      let data = [];
      userDetails.phone_no = "+" + userDetails.phone_no;
      console.log(userDetails);
      for (const key in userDetails) {
        if (key !== "phone_no") {
          var encodedKey = encodeURIComponent(key);
          var encodedValue = encodeURIComponent(userDetails[key]);
          data.push(encodedKey + "=" + encodedValue);
          // data += key + "=" + userDetails[key] + "&";
        } else {
          var encodedKey = encodeURIComponent(key);
          var encodedValue = encodeURIComponent(
            userDetails[key].replace(/\s/g, "")
          );
          data.push(encodedKey + "=" + encodedValue);
          // data += "+" + key + "=" + userDetails[key] + "&";
        }
      }
      data = data.join("&");
      console.log(data);
      fetch("https://api2.juegogames.com/NOMOS-V3/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: data,
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    }
    // props.updateId(54);
    // console.log(userDetails);
    // props.compSubmit(2);
  };

  return (
    <div className="comp1Container">
      <h3 className="comp1h3">Let's create an account</h3>
      <div className="inputContainer">
        <span className="comp1Text">Full Name</span>
        <Input
          type={"text"}
          className={"nameInput"}
          value={userDetails.fullName}
          OnInputChange={handleNameChange}
        />
        <span className="comp1Text">Phone</span>
        <PhoneInput
          country={"us"}
          containerStyle={{
            margin: "0.5em 0em 1.6em",
          }}
          inputStyle={{
            width: "100%",
            border: "none",
            backgroundColor: "#eee",
          }}
          value={userDetails.phone}
          onChange={handlePhoneChange}
        />
        {/* <Input
          type={"phone"}
          className={"phoneInput"}
          value={props.phoneVal}
          OnInputChange={handlePhoneChange}
        /> */}
        <span className="comp1Text">Email</span>
        <Input
          type={"email"}
          className={"emailInput"}
          value={userDetails.email}
          OnInputChange={handleEmailChange}
        />
        <span className="comp1Text">Password</span>
        <Input
          type={"password"}
          className={"passwordInput"}
          value={userDetails.password}
          OnInputChange={handlePasswordChange}
        />
        <div className="policyContainer">
          <span className="policyMessage">
            By continuing, I agree to the
            <br />
            <span className="textGreen">Terms and Conditions</span> and{" "}
            <span className="textGreen">Privacy Policy</span>
          </span>
        </div>
        <Button
          btnContent={"Next"}
          className={"signupOne"}
          onBtnClick={btnClickHandler}
        />
      </div>
    </div>
  );
};

export default SignupComp1;
