// import { useState } from "react";
import { Link } from "react-router-dom";
// import SingleProduct from "../com+ponents/SingleProduct";
import { useGetAllProductsQuery } from "../features/productsApi";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Products = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();
  // const [products, setProducts] = useState();
  // console.log(data);
  return (
    <>
      <div className="home-container">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>An Error has Occured</p>
        ) : (
          <>
            <h2>Latest Hostels</h2>
            <div className="products">
              {data?.map((product) => (
                  <div key={product._id} className="product">
                    <div className="product-container">
                      <Link to={`/products/${product._id}`}>
                        <div className="image-container">
                          <img
                            src={product.pictures[0].url}
                            alt={product.name}
                            className="product-image"
                          />
                          {/* <i class="fa-light fa-heart"></i> */}
                          {/* <FontAwesomeIcon icon="fa-light fa-heart" /> */}
                        </div>
                      </Link>
                      <div className="details">
                        <h6>{product.name}</h6>
                        {/* <span className="product-desc">{product.description}</span> */}
                        <span className="price">N{product.price}</span>
                        <div className="icon-details">
                          <div className="icon-bed">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 640 512"
                            >
                              <path d="M32 32c17.7 0 32 14.3 32 32V320H288V160c0-17.7 14.3-32 32-32H544c53 0 96 43 96 96V448c0 17.7-14.3 32-32 32s-32-14.3-32-32V416H352 320 64v32c0 17.7-14.3 32-32 32s-32-14.3-32-32V64C0 46.3 14.3 32 32 32zM176 288c-44.2 0-80-35.8-80-80s35.8-80 80-80s80 35.8 80 80s-35.8 80-80 80z" />
                            </svg>
                          </div>
                          <span className="room-no">{product.noOfRooms}</span>
                        </div>
                        <div className="icon-details">
                          <div className="icon-loc">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-geo-alt-fill"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                            </svg>
                          </div>
                          <span className="location">{product.location}</span>
                        </div>
                      </div>
                    </div>
                    {/* <SingleProduct product={product} /> */}
                    {/* <button>View</button> */}
                  </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Products;
