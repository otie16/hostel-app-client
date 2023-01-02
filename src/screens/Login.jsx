import { useEffect, useState } from "react";
// import styled from "styled-components";
import { StyledForm } from "../components/StyledForm";
import { loginUser } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { isAdmin, _id, loginStatus, loginError } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  console.log(isAdmin);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser(user));
  };

  useEffect(() => {
    if (_id) {
      navigate("/cart");
    }
  }, [_id, navigate]);

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button>
          {loginStatus === "pending" ? "Logging in..." : "Login"}
        </button>

        {loginStatus === "rejected" ? <p>{loginError}</p> : null}
      </StyledForm>
      {/* {auth.role === "vendor" ? (navigate("/vendor")): (navigate("/user"))} */}
    </>
  );
};

export default Login;
