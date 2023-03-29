import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import axiosInstance from "../components/axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Login = () => {

  const {auth, setAuth } = useAuth();

  const navigate = useNavigate()
  const submitHandler = (e) => {
    e.preventDefault();
  };

  const initialFormData = Object.freeze({
    phone: '',

    password: '',
  });
  const [FormData, updateFormData] = useState(initialFormData);
  const handleChange = (e) => {
    updateFormData({
      ...FormData,
      [e.target.name]: e.target.value.trim(),
    })
  };

  // if(localStorage.getItem('auth')){
  //   setAuth(localStorage.getItem('auth'))
  //   if(auth.role==1)
  //       navigate("/admin");
  //       else
  //       navigate("/home")
  //     }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(FormData);

    await axiosInstance
      .post('https://quick-bites-api.herokuapp.com/api/token/', {
        phone: FormData.phone,
        password: FormData.password,
      })
      .then(async (res) => {
        localStorage.setItem('access_token', res.data.access);
        localStorage.setItem('refresh_token', res.data.refresh);
        axiosInstance.defaults.headers['Authorization'] =
          'JWT ' + localStorage.getItem('access_token');
        await axiosInstance
          .post('https://quick-bites-api.herokuapp.com/api/userdetails', {
            phone: FormData.phone
          })
          .then(res=>{
            console.log(res);
            const role = res.data.is_admin==true?1:0;
            const user = FormData.phone;
            console.log(role)
            setAuth({user,role})
            localStorage.setItem('auth', auth)
            console.log(auth);
          })
          console.log()
        console.log("Successfully logged in")
        if(auth.role==1)
        navigate("/admin");
        else
        navigate("/home")
        
      })
  }

  return (
    <Helmet title="Login">
      <CommonSection title="Login" />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12" className="m-auto text-center">
              <form className="form mb-5" onSubmit={submitHandler}>
                <div className="form__group">
                  <input
                    type="email"
                    name="phone"
                    placeholder="Enter phone"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    required
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="addTOCart__btn" onClick={handleSubmit}>
                  Login
                </button>
              </form>
              <Link to="/register">
                Don't have an account? Create an account
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
