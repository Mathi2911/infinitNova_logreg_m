import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loginError, setLoginError] = useState("");
    const navigate = useNavigate();
   

    const handleLogin = async (e) => {
        e.preventDefault();

        let isValid = true;
        if (!email) {
            setEmailError("Email is required");
            isValid = false;
        } else {
            setEmailError("");
        }

        if (!password) {
            setPasswordError("Password is required");
            isValid = false;
        } else {
            setPasswordError("");
        }

        if (!isValid) {
            return;
        }

        try {
            let response = await fetch("http://localhost:8080/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password}),
            });
      

            if (response.status === 200) {
                setLoginError("Login Successful.");

                const data = await response.json();

                const userRole = data.role;
        
                switch (userRole) {
                  case "admin":
                    navigate("/admin");
                    break;
                  case "user":
                    navigate("/dashboard");
                    break;
                  case "webdesigner":
                    navigate("/webdesigner");
                    break;
                  default:
                    setLoginError("Role not defined.");
                }
            } else if (response.status === 400) {
                setLoginError("User not found");
            } else if (response.status === 401) {
                setLoginError("Invalid email or password");
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            setLoginError("Something went wrong");
        }
    }

    return (
        <Typography component="div" sx={{ maxWidth: "500px", margin: "auto", paddingTop: "20px" }}>
            <Typography variant="h1" sx={{ textAlign: 'center', fontSize:'32px' }}>Login</Typography>
            <Typography component="form" sx={{ display: "flex", flexDirection: "column" }}>
                <TextField
                    sx={{ marginTop: "20px", borderColor: emailError ? 'red' : '' }}
                    label="Email"
                    name="email"
                    type="email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailError("");
                        setLoginError("");
                    }}
                    error={Boolean(emailError)}
                    helperText={emailError}
                />
                <TextField
                    sx={{ marginTop: "20px", borderColor: passwordError ? 'red' : '' }}
                    label="Password"
                    name="password"
                    type="password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordError("");
                        setLoginError("");
                    }}
                    error={Boolean(passwordError)}
                    helperText={passwordError}
                />
                <Button
                    sx={{ marginTop: "20px" }}
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                >
                    Login
                </Button>
                <Typography variant="body2" sx={{ marginTop: "10px", textAlign: "center" }}>
                    New user? <Link to="/signup">Sign up</Link>
                </Typography>
                {loginError && (
                    <Typography variant="body2" sx={{ marginTop: "10px", textAlign: "center", color: 'red' }}>
                        {loginError}
                    </Typography>
                )}
            </Typography>
        </Typography>
    );
}

export default Login;
