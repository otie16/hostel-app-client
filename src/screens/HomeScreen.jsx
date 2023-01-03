import NavBar from "../components/NavBar";
import Products from "../screens/Products";
// import { useSelector } from "react-redux"; //for async thunk

const HomeScreen = () => {
  console.log(process.env.REACT_APP_MY_API_URL);

  return (
    <>
      {/* <NavBar /> */}
      <Products />
    </>
  );
};

export default HomeScreen;
