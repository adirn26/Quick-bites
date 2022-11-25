import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axiosInstance from "../components/axios";
const Register = () => {


  const submitHandler = (e) => {
    e.preventDefault();
  };
  const initialFormData = Object.freeze({
    phone: '',
    user_name: '',
    password: '',
  });
  const [FormData, updateFormData] = useState(initialFormData);
  const handleChange = (e) => {
    updateFormData({
      ...FormData,
      [e.target.name]: e.target.value.trim(),
    })
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(FormData);

    try {
      axiosInstance
        .post('http://127.0.0.1:8000/api/register/', {
          phone: FormData.phone,
          user_name: FormData.user_name,
          password: FormData.password,
        })

        .then((res) => {

          console.log(res.data);
        })

    }

    catch (error) {
      console.error(error.res.data);     // NOTE - use "error.response.data` (not "error")
    }
  }

  return (
    <Helmet title="Signup">
      <CommonSection title="Signup" />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12" className="m-auto text-center">
              <form className="form mb-5" onSubmit={submitHandler}>
                <div className="form__group">
                  <input
                    type="number"
                    placeholder="Enter Phone"
                    required
                    name="phone"
                    onChange={handleChange}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Enter username"
                    required
                    name="user_name"
                    onChange={handleChange}
                    
                  />
                </div>
                <div className="form__group">
                  <input
                    type="password"
                    placeholder="Enter Password"
                    required
                    name="password"
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="addTOCart__btn" onClick={handleSubmit}>
                  Sign Up
                </button>
              </form>
              <Link to="/login">Already have an account? Login</Link>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Register;
