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
    <div className="w-full h-full">
      <div className="px-[20px] h-screen">
        <div className="mx-[120px] h-[80px] flex items-center">
          <NavLink to="/" className="font-medium text-[24px]">
            phoebe
          </NavLink>
        </div>
        <div className="flex justify-center items-center flex-col my-auto mx-0 h-[70%]">
          <div className="text-center">
            <h1 className="text-[32px]">Welcome to Phoebe</h1>
            <h2 className="text-[20px] text-[#6D6E6F] font-medium">
              To get started, please sign in
            </h2>
            <div className="py-[10px] px-[83px] rounded-[10px] my-[10px] border-solid border-[#6D6E6F] border-[1px] text-[16px] cursor-pointer" onClick={demoHandleSubmit}>
              Continue with Demo Login
            </div>
          </div>
          <form onSubmit={''} className="w-[380px]">
            <div className="m-[10px] flex flex-col">
              <label>Email</label>
              <input
                type="email"
                required
                className="border-black border-[1px] p-[5px] text-[14px]"
              />
            </div>
            <div className="m-[10px] flex flex-col">
              <label>Password</label>
              <input
                type="password"
                required
                className="border-black border-[1px] p-[5px] text-[14px]"
              />
            </div>
            <button type="submit">Continue</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
