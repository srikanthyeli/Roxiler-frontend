import { Component } from "react";
import { Link } from "react-router-dom";
import "./RegisterPage.css";

class RegisterPage extends Component {
  state = {
    name: "",
    password: "",
    email: "",
    address: "",
    role: "User",
    showSubmitError: false,
    errorMsg: "",
  };

  onChangename = (event) => {
    this.setState({ name: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  onChangeEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  onChangeAddress = (event) => {
    this.setState({ address: event.target.value });
  };

  onChangeRole = (event) => {
    this.setState({ role: event.target.value });
  };

  onSubmitSuccess = () => {
    this.setState({
      name: "",
      email: "",
      password: "",
      address: "",
      role: "User",
      showSubmitError: false,
    });
    alert("Registration successful!");
  };

  onSubmitFailure = (errorMsg) => {
    this.setState({ showSubmitError: true, errorMsg });
  };

  submitForm = async (event) => {
    event.preventDefault();
    const { name, password, email, address, role } = this.state;
    const userDetails = {
      email: email,
      name: name,
      password: password,
      address: address,
      role: role,
    };

    try {
      const url = "https://roxlier-backend-1.onrender.com/register/";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });

      if (response.ok) {
        this.onSubmitSuccess();
      } else {
        throw new Error("An error occurred while registering. Please try again.");
      }
    } catch (error) {
      console.error(error);
      this.onSubmitFailure(error.message);
    }
  };

  render() {
    const { showSubmitError, errorMsg, role } = this.state;
    return (
      <div className="register-page">
        <div className="register-wrapper">
          <div className="register-content">
            <h1>Create Account</h1>
            <p className="subtitle">Join our community today</p>
            
            <form onSubmit={this.submitForm}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  value={this.state.name}
                  onChange={this.onChangename}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                  placeholder="Create a password"
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  value={this.state.address}
                  onChange={this.onChangeAddress}
                  placeholder="Enter your address"
                />
              </div>

              <div className="form-group">
                <label htmlFor="role">Role</label>
                <select id="role" value={role} onChange={this.onChangeRole}>
                  <option value="User">Normal User</option>
                  <option value="StoreOwner">Store Owner</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <button type="submit" className="submit-btn">Create Account</button>

              {showSubmitError && <p className="error-message">{errorMsg}</p>}
            </form>

            <div className="login-section">
              <p>Already have an account?</p>
              <Link to="/" className="login-link">Login</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterPage;