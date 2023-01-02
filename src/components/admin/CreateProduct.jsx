import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Alert, Col, Container, Form, Row, Button } from "react-bootstrap";
// import Button from "react-bootstrap/Button";
// import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "../../axios";
// import { PrimaryButton } from "./CommonStyled";
// import { createProduct } from "../../features/productsApi";
import { productsCreate } from "../../features/productsSlice";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const products = useSelector((state) => state.products);
  // console.log(products);

  const [images, setImages] = useState([]);
  const [imageToRemove, setImageToRemove] = useState(null);
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [noOfRooms, setNoOfRooms] = useState("");
  // const [createProduct] = useCreateProductMutation();
  // const [category, setCategory] = useState();

  //converting image to base64
  // const handleProductImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   TransformFileData(file);
  //   console.log(file);
  // };

  // const TransformFileData = (file) => {
  //   const reader = new FileReader();

  //   if (file) {
  //     reader.readAsDataURL(file);
  //     reader.onloadend = () => {
  //       setImage(reader.result);
  //     };
  //   } else {
  //     setImage("");
  //   }
  // };

  //Uploading the image
  const showWidget = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "otyg",
        uploadPreset: "hostel_seeker",
      },
      (error, result) => {
        if (!error && result.event === "success") {
          setImages((prev) => [
            ...prev,
            { url: result.info.url, public_id: result.info.public_id },
          ]);
        }
      }
    );
    widget.open();
  };

  //Removing the image
  const handleRemoveImage = (imgObj) => {
    setImageToRemove(imgObj.public_id);

    axios
      .delete(`/images/${imgObj.public_id}/`)
      .then((res) => {
        setImageToRemove(null);
        setImages((prev) =>
          prev.filter((img) => img.public_id !== imgObj.public_id)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      productsCreate({
        name,
        location,
        price,
        description,
        images,
        noOfRooms,
      })
    );
    setTimeout(() => {
      navigate("/");
    });
  };

  return (
    <Container>
      <Row>
        <Col md={6} className="new-product__form--container">
          <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
            <h1 className="mt-4">Create a Hostel</h1>
            <Form.Group className="mb-3">
              <Form.Label>Hostel name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter hostel name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Hostel description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Hostel description"
                style={{ height: "100px" }}
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price(N)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Price (N)"
                value={price}
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>No of Rooms</Form.Label>
              <Form.Control
                type="number"
                placeholder="No of rooms"
                value={noOfRooms}
                required
                onChange={(e) => setNoOfRooms(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              onChange={(e) => setLocation(e.target.value)}
            >
              <Form.Label>Hostel Location</Form.Label>
              <Form.Select>
                <option disabled selected>
                  -- Select One --
                </option>
                <option value="Bdpa">Bdpa</option>
                <option value="Osasogie">Osasogie</option>
                <option value="Ekosodin">Ekosodin</option>
                <option value="Isio">Isio</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Button type="button" onClick={showWidget}>
                Upload Images
              </Button>
              <div className="images-preview-container">
                {images.map((image) => (
                  <div className="image-preview">
                    <img src={image.url} alt="error!" />
                    {imageToRemove !== image.public_id && (
                      <i
                        className="fa fa-times-circle"
                        onClick={() => handleRemoveImage(image)}
                      ></i>
                    )}
                  </div>
                ))}
              </div>
            </Form.Group>

            <Form.Group>
              <Button type="submit">Create Product</Button>
            </Form.Group>
          </Form>
        </Col>
        <Col md={6} className="new-product__image--container"></Col>
      </Row>
    </Container>
  );
};

export default CreateProduct;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin-top: 2rem;
  select,
  input {
    padding: 7px;
    min-height: 30px;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(182, 182, 182);
    margin: 0.3rem 0;
    &:focus {
      border: 2px solid rgb(0, 208, 255);
    }
  }
  select {
    color: rgb(95, 95, 95);
  }
`;

const StyledCreateProduct = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ImagePreview = styled.div`
  margin: 2rem 0 2rem 2rem;
  padding: 2rem;
  border: 1px solid rgb(183, 183, 183);
  max-width: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: rgb(78, 78, 78);
  img {
    border-radius: 5px;
    max-width: 100%;
  }
`;
