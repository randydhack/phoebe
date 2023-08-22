import { NavLink, Redirect } from "react-router-dom";
import { signup } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

function SignupPage() {
  const dispatch = useDispatch();
  const userSession = useSelector((state) => state.session.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState({});

  if (userSession) return <Redirect to="/home" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        signup({
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
        })
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          if (data.errors.email) setEmail("");
          setErrors(data.errors);
        }
      });
    }
    return setErrors({
      confirmPassword: "Password must match",
    });
  };

  console.log(errors.lastName);

  return (
    <div className="items-center flex flex-col mx-[32px] min-h-screen">
      <div className="flex items-center box-border h-[80px] justify-center pl-[32px] fixed w-full z-[100]">
        <NavLink
          to="/"
          className="font-medium text-[24px] w-full max-w-[1280px]"
        >
          phoebe
        </NavLink>
      </div>
      <div className="flex items-center flex-col my-auto mx-0 max-w-[480px] min-h-[420px] w-full">
        <div className="items-center flex flex-col max-w-[400px] w-full">
          <h2 className="text-[32px] mb-0 leading-[40px]">Welcome to Phoebe</h2>
          <span className="text-[20px] text-[#6D6E6F] font-medium leading-[28px] mb-[32px] mt-[8px]">
            To get started, please sign up
          </span>
          <div className="flex flex-col w-full">
            <span className="flex text-center items-center w-full mb-[20px]">
              <span className="border-t-[1px] border-solid border-[#edeae9] flex-auto min-w-[1px] pt-[8px] mt-[8px]"></span>
              <span className="border-t-[1px] border-solid border-[#edeae9] flex-auto min-w-[1px] pt-[8px] mt-[8px]"></span>
            </span>

            <form onSubmit={handleSubmit} className="w-full">
              <div className="flex w-full mb-[10px]">
                <div className="mr-[5px]">
                  <label className="text-[#6D6E6F] text-[12px] font-medium mb-[6px]">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="border-[#CECBCB] border-[1px] p-[5px] text-[14px] rounded-[5px] w-full"
                  />
                </div>
                <div>
                  {errors.lastName ? (
                    <label className="text-[#6D6E6F] text-[12px] font-medium mb-[6px]">
                      Last Name
                    </label>
                  ) : (
                    <label className="text-[#6D6E6F] text-[12px] font-medium mb-[6px]">
                      Last Name - {errors.lastName}
                    </label>
                  )}
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="border-[#CECBCB] border-[1px] p-[5px] text-[14px] rounded-[5px] w-full"
                  />
                </div>
              </div>
              <div className="flex flex-col w-full mb-[10px]">
                <label className="text-[#6D6E6F] text-[12px] font-medium mb-[6px]">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-[#CECBCB] border-[1px] p-[5px] text-[14px] rounded-[5px] w-full"
                />
              </div>
              <div className="w-full flex flex-col mb-[10px]">
                <label className="text-[#6D6E6F] text-[12px] font-medium mb-[6px]">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-[#CECBCB] border-[1px] p-[5px] text-[14px] rounded-[5px]"
                />
              </div>
              <div className="w-full flex flex-col mb-[25px]">
                <label className="text-[#6D6E6F] text-[12px] font-medium mb-[6px]">
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="border-[#CECBCB] border-[1px] p-[5px] text-[14px] rounded-[5px]"
                />
              </div>
              <button
                type="submit"
                className="flex items-center justify-center w-full h-[38px] bg-[#4573D1] rounded-[5px] text-white"
              >
                Create Account
              </button>
            </form>

            <NavLink
              to="/login"
              className="mt-[10px] text-[#6D6E6F] cursor-pointer w-fit"
            >
              Already have an account?
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;