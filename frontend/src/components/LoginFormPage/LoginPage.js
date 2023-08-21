import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/session";
import { Redirect, useHistory, NavLink } from "react-router-dom";

function LoginPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const userSession = useSelector((state) => state.session.user);

  if (userSession) return <Redirect to="home" />;

  const demoHandleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      login({
        credential: "demo@aa.io",
        password: "password",
      })
    );

    return history.push("/home");
  };

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
            To get started, please sign in
          </span>
          <div className="flex flex-col w-full">
            <div
              className="border-solid border-[#cfcbcb] border-[1px] cursor-pointer text-[16px] h-[48px] px-[16px] leading-[48px] w-full flex items-center justify-center rounded-[5px] mb-[20px]"
              onClick={demoHandleSubmit}
            >
              Continue with Demo
            </div>

            <span className="flex text-center items-center w-full mb-[20px]">
              <span className="border-t-[1px] border-solid border-[#edeae9] flex-auto min-w-[1px] pt-[8px] mt-[8px]"></span>
              <span className="px-[10px]">or</span>
              <span className="border-t-[1px] border-solid border-[#edeae9] flex-auto min-w-[1px] pt-[8px] mt-[8px]"></span>
            </span>

            <form onSubmit={""} className="w-full">
              <div className="flex flex-col w-full mb-[10px]">
                <label className="text-[#6D6E6F] text-[12px] font-medium mb-[6px]">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  className="border-[#CECBCB] border-[1px] p-[5px] text-[14px] rounded-[5px] w-full"
                />
              </div>
              <div className="w-full flex flex-col mb-[25px]">
                <label className="text-[#6D6E6F] text-[12px] font-medium mb-[6px]">
                  Password
                </label>
                <input
                  type="password"
                  required
                  className="border-[#CECBCB] border-[1px] p-[5px] text-[14px] rounded-[5px]"
                />
              </div>
              <button type="submit" className="flex items-center justify-center w-full h-[38px] bg-[#4573D1] rounded-[5px] text-white">Continue</button>
            </form>

            <div className="mt-[10px] text-[#6D6E6F] cursor-pointer w-fit ">Don't have an account?</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
