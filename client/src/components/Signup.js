import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Link } from "react-router-dom";
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';


function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();

    const isEmailValid = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    }

    const isPasswordValid = (password) => {
        const minLength = 8;
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/.test(password);

        return (
            password.length >= minLength &&
            hasNumber &&
            hasSpecialChar
        );
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        if (!isEmailValid(email)) {
            setEmailError('Invalid email format');
            return;
        }

        if (!isPasswordValid(password)) {
            setPasswordError('Password must be at least 8 characters long and contain numbers and special characters');
            return;
        }

        try {
            const result = await fetch('http://localhost:8080/register', {
                method: "post",
                body: JSON.stringify({ firstName, lastName, address, email, role, password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (result.status === 200) {
                navigate('/login');
            } else {
                setEmailError('Email already exists');
            }
        } catch (error) {
            console.error('Signup error:', error);
        }
    }

    return (
        <Typography component="div" sx={{ maxWidth: "500px", margin: "auto", paddingTop: "20px" }}>
            <Typography variant="h1" sx={{ textAlign: 'center', fontSize: '32px' }}>Register</Typography>
            <Typography component="form" sx={{ display: "flex", flexDirection: "column" }}>
                <TextField
                    sx={{ marginTop: "20px" }}
                    label="First Name"
                    name="firstName"
                    variant="outlined"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}

                />
                <TextField
                    sx={{ marginTop: "20px" }}
                    label="Last Name"
                    name="lastName"
                    variant="outlined"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <TextField
                    sx={{ marginTop: "20px" }}
                    label="Address"
                    name="address"
                    variant="outlined"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <TextField
                    sx={{
                        marginTop: "20px",
                        borderColor: emailError ? 'red' : '',
                    }}
                    label="Email"
                    name="email"
                    type="email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailError("");
                    }}
                    error={Boolean(emailError)}
                    helperText={emailError}
                />
                <TextField
                    sx={{ marginTop: "20px" }}
                    label="Role"
                    name="Role"
                    variant="outlined"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                />
                <TextField
                    sx={{
                        marginTop: "20px",
                        borderColor: passwordError ? 'red' : '',
                    }}
                    label="Password"
                    name="password"
                    type="password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordError("");
                    }}
                    error={Boolean(passwordError)}
                    helperText={passwordError}
                />
                <Button
                    sx={{ marginTop: "20px" }}
                    component={Link}
                    variant="contained"
                    color="primary"
                    onClick={handleOnSubmit}
                    to="/login"
                >
                    Register
                </Button>
                <Typography variant="body2" sx={{ marginTop: "10px", textAlign: "center" }}>
                    Already have an account? <Link to="/login">Login</Link>
                </Typography>
            </Typography>
        </Typography>
    );
}

export default Signup;
