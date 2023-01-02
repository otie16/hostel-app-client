import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { useNavigate } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css"
import axios from "../axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { Badge, ButtonGroup, Col, Container, Row } from "react-bootstrap";

const SingleProduct = () => {
    const { isAdmin, userLoaded } = useSelector(
      (state) => state.auth
    );
  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  // const { data } = useGetSingleProductQuery(productId);

  console.log(productId);
  // console.log(data)
  const handleDragStart = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    axios.get(`/products/${productId}`).then(({ data }) => {
      // console.log(data)
      setProduct(data.product);
      setSimilar(data.similar);
    });
  }, [productId]);
  // console.log(product.pictures[0]);


  // // If there no product available for display
  if (!product) {
    return <Loading />;
  }

  const images = product.pictures.map((picture) => (
    <img
      className="product__carousel--image"
      src={picture.url}
      alt="picture_carousel"
      onDragStart={handleDragStart}
    />
  ));

  return (
    <Container className="pt-4" style={{ position: "relative" }}>
      <Row>
        <Col lg={6}>
          <AliceCarousel
            mouseTracking
            items={images}
            controlsStrategy="alternate"
            duration={400}
            autoPlay={true}
            autoPlayInterval={2000}
            autoPlayDirection="ltr"
            // autoPlayControls={true}
            // autoPlayActionDisabled={true}
          />
        </Col>
        <Col lg={6} className="pt-4">
          <h1>{product.name}</h1>
          <p>
            <Badge bg="primary">{product.location}</Badge>
          </p>
          <p>N{product.price}</p>
          <p className="py-3" style={{ textAlign: "justify" }}>
            <strong>Description: </strong>
            {product.description}
          </p>
          {/* {userLoaded && !isAdmin && (
            <ButtonGroup style={{width: 90%}}>
              <
          </ButtonGroup>
          )} */}
        </Col>
      </Row>
    </Container>
  );
};
/* <button onClick={() => handleAddToCart(product)}>View</button> */
export default SingleProduct;
