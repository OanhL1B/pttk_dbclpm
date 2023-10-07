import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/actions/loginActions";
import Spinner from "../utils/Spinner";
import { Link, useNavigate } from "react-router-dom";
import CAMELIA from "./logo.png";
import ECLLIPSE from "./ellipse.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((state) => state);
  const [error, setError] = useState({});

  useEffect(() => {
    if (store.errors) {
      setError(store.errors);
    }
  }, [store.errors]);

  const login = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(userLogin({ email: email, password: password }, navigate));
  };
  useEffect(() => {
    if (store.errors) {
      setLoading(false);
      setEmail("");
      setPassword("");
    }
  }, [store.errors]);

  return (
    <div className="relative w-full min-h-screen p-10 bg-lite dark:bg-dark isolate">
      <img
        src={ECLLIPSE}
        alt="bg"
        className="hidden lg:block pointer-events-none absolute bottom-0 left-0 right-0 z-[-1]"
      />
      <Link to="/" className="inline-block mb-5 lg:mb-16">
        <img srcSet={CAMELIA} alt="camelia" className="h-12" />
      </Link>

      <div className="w-full max-w-[556px] bg-white dark:bg-darkSecondary rounded-xl px-5 py-8 lg:px-16 lg:py-12 mx-auto ">
        <h1 className="mb-1 text-lg font-semibold text-center lg:mb-3 lg:text-xl lg: text-text1 dark:text-white">
          Chào mừng bạn quay trở lại!
        </h1>

        <form
          onSubmit={login}
          className="flex flex-col items-center justify-center w-full space-y-6 duration-1000 bg-white"
        >
          <div className="flex flex-col w-full h-full mb-4 lg:mb-5 gap-y-2 lg:gap-x-3">
            <label className="self-start inline-block text-sm font-medium cursor-pointer text-text2 dark:text-text3">
              Email *
            </label>
            <div className="flex items-center w-full bg-white rounded-lg ">
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                name="email"
                type="email"
                required
                className="w-full px-6 py-4 text-sm font-medium bg-transparent border focus:border-[#157572] focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40  rounded-xl placeholder:text-text4 dark:placeholder:text-text2 dark:text-white border-strock text-text1 dark:border-darkStroke"
                placeholder="example@gmail.com"
              />
            </div>
          </div>

          <div className="flex flex-col w-full h-full mb-4 lg:mb-5 gap-y-2 lg:gap-x-3">
            <label
              htmlFor="password"
              className="self-start inline-block text-sm font-medium cursor-pointer text-text2 dark:text-text3"
            >
              Mật khẩu *
            </label>

            <div className="flex items-center w-full bg-white rounded-lg">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                name="password"
                type={showPassword ? "text" : "password"}
                className="relative w-full px-6 py-4 text-sm font-medium bg-transparent border focus:border-[#157572] focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40  rounded-xl placeholder:text-text4 dark:placeholder:text-text2 dark:text-white border-strock text-text1 dark:border-darkStroke"
                placeholder="Nhập mật khẩu của bạn..."
              />
              <div className="absolute ml-[384px] mt-2">
                {showPassword ? (
                  <VisibilityIcon
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer"
                  />
                ) : (
                  <VisibilityOffIcon
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer"
                  />
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="flex items-center justify-center p-4 text-base font-semibold rounded-xl min-h-[56px] bg-primary text-white  w-full"
          >
            Đăng nhập
          </button>

          {loading && (
            <Spinner
              message="Logging In"
              height={30}
              width={150}
              color="#ffffff"
              messageColor="#fff"
            />
          )}
          {error.message ? (
            <p className="text-red-500">{error.message}</p>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
