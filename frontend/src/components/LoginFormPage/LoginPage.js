import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/session";
import { Redirect, useHistory, NavLink } from "react-router-dom";
import { useState } from "react";

function LoginPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const userSession = useSelector((state) => state.session.user);

  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);

  if (userSession) return <Redirect to="/home" />;

  const demoHandleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(
      login({
        credential: "demo@aa.io",
        password: "password",
      })
    );
    if (data) {

      return history.push("/home");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     const data = await dispatch(
      login({
        credential,
        password,
      })
    ).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) {
        setErrors(data.errors);
      }
    });

    if (data) {
      setErrors({})
      return history.push("/home");
    }
  };

  return (
    <div className="items-center flex flex-col min-h-screen w-full">
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
            To get started, please sign in
          </span>
          <div className="flex flex-col w-full">
            <div
              className="border-solid border-[#cfcbcb] border-[1px] cursor-pointer text-[16px] h-[48px] px-[16px] leading-[48px] w-full flex items-center justify-center rounded-[5px] mb-[20px]"
              onClick={e=> demoHandleSubmit(e)}
            >
              Continue with Demo
            </div>

            <span className="flex text-center items-center w-full mb-[20px]">
              <span className="border-t-[1px] border-solid border-[#edeae9] flex-auto min-w-[1px] pt-[8px] mt-[8px]"></span>
              <span className="px-[10px]">or</span>
              <span className="border-t-[1px] border-solid border-[#edeae9] flex-auto min-w-[1px] pt-[8px] mt-[8px]"></span>
            </span>

            <form onSubmit={handleSubmit} className="w-full">
              <div className="flex flex-col w-full mb-[10px]">
                <label className="text-[#6D6E6F] text-[12px] font-medium mb-[6px]">
                  {!errors ? (
                    "Email Address"
                  ) : (
                    <span className="text-red-500 ">
                      Email Address -{" "}
                      <span className="text-red-500 italic text-[10px]">
                        Invalid email or password
                      </span>
                    </span>
                  )}
                </label>
                <input
                  type="email"
                  required
                  value={credential}
                  onChange={(e) => setCredential(e.target.value)}
                  className={`${
                    !errors ? "border-[#CECBCB]" : "border-red-500"
                  } border-[1px] p-[5px] text-[14px] rounded-[5px]`}
                />
              </div>
              <div className="w-full flex flex-col mb-[25px]">
                <label className="text-[#6D6E6F] text-[12px] font-medium mb-[6px]">
                  {!errors ? (
                    "Password"
                  ) : (
                    <span className="text-red-500 ">
                      Password -{" "}
                      <span className="text-red-500 italic text-[10px]">
                        Invalid email or password
                      </span>
                    </span>
                  )}
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${
                    !errors ? "border-[#CECBCB]" : "border-red-500"
                  } border-[1px] p-[5px] text-[14px] rounded-[5px]`}
                />
              </div>
              <button
                type="submit"
                className="flex items-center justify-center w-full h-[38px] bg-[#4573D1] rounded-[5px] text-white"
              >
                Continue
              </button>
            </form>

            <NavLink
              to="/signup"
              className="mt-[10px] text-[#6D6E6F] cursor-pointer w-fit hover:underline"
            >
              Don't have an account?
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
