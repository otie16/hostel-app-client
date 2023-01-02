import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { logoutUser } from "../features/authSlice";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
const NavBar = () => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // console.log(auth.role);
  // console.log(auth);
  const dispatch = useDispatch();
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  // const { user, vendor, admin } = useSelector((state) => state.auth.role);

  
  
  const handleLogout = () => {
    dispatch(logoutUser());
    toast.warning("You have Logged out", {
      position: "bottom-left",
      theme: "colored",
    });

    navigate("/")
  };

  return (
    <nav className="nav-bar">
      <Link to="/">
        <nav className="nav-bar-left">
          <h2>HostelSeeker</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            fill="currentColor"
            class="bi bi-eyeglasses"
            viewBox="0 0 16 16"
          >
            <path d="M4 6a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm2.625.547a3 3 0 0 0-5.584.953H.5a.5.5 0 0 0 0 1h.541A3 3 0 0 0 7 8a1 1 0 0 1 2 0 3 3 0 0 0 5.959.5h.541a.5.5 0 0 0 0-1h-.541a3 3 0 0 0-5.584-.953A1.993 1.993 0 0 0 8 6c-.532 0-1.016.208-1.375.547zM14 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
          </svg>
        </nav>
      </Link>
      <Link to="/cart">
        <div className="nav-bag">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            fill="currentColor"
            className="bi bi-cart-fill"
            viewBox="0 0 16 16"
          >
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>
          <div className="bag-quantity">
            <span>{cartTotalQuantity}</span>
          </div>
        </div>
      </Link>
      {auth.role === "user" ? (
        <Links>
          <div>
            <Link to="/">User</Link>
          </div>
          <div
            onClick={() => {
              handleLogout();
            }}
          >
            Logout
          </div>
        </Links>
      ) : auth.role === "admin" ? (
        <Links>
          <div>
            <Link to="/admin/summary">Admin</Link>
          </div>
          <div
            onClick={() => {
              handleLogout();
            }}
          >
            Logout
          </div>
        </Links>
      ) : auth.role === "vendor" ? (
        <Links>
          <div>
            <Link to="admin">Landlord</Link>
          </div>
          <div
            onClick={() => {
              handleLogout();
            }}
          >
            Logout
          </div>
        </Links>
      ) : (
        <AuthLinks>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </AuthLinks>
      )}
    </nav>
  );
};

export default NavBar;

const AuthLinks = styled.div`
  a {
    &:last-child {
      margin-left: 2rem;
    }
  }
`;

const Logout = styled.div`
  color: white;
  cursor: pointer;
`;

const Links = styled.div`
  color: white;
  display: flex;

  div {
    cursor: pointer;

    &:last-child {
      margin-left: 2rem;
    }
  }
`;
