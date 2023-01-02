import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import Products from "./screens/Products";
import SingleProduct from "./components/SingleProduct";
import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";
import Register from "./screens/Register";
import Login from "./screens/Login";
import Dashboard from "./components/admin/Dashboard";
import Users from "./components/admin/Users";
import Orders from "./components/admin/Orders";
import CreateProduct from "./components/admin/CreateProduct";
import ViewProducts from "./components/admin/Products";
import Summary from "./components/admin/Summary";
import CheckoutSuccess from "./components/CheckoutSuccess";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <NavBar />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<SingleProduct />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="/admin" element={<Dashboard />}>
            <Route path="products" element={<ViewProducts />}>
              <Route path="create-product" element={<CreateProduct />} />
            </Route>
            <Route path="summary" element={<Summary />} />
            <Route path="orders" element={<Orders />} />
            <Route path="users" element={<Users />} />
          </Route>
          <Route path="*" element={<NotFound />} />
          <Route path="/checkout-err" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
