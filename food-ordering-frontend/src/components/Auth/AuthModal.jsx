import React from 'react';
import { Modal, Box } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    outline: 'none',
    boxShadow: 24,
    p: 4,
    borderRadius: 2
};

export const AuthModal = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Cửa sổ mở khi đường dẫn URL chứa cụm từ bên dưới
    const handleClose = () => {
        navigate("/");
    };

    return (
        <Modal
            open={
                location.pathname === "/account/register" ||
                location.pathname === "/account/login"
            }
            onClose={handleClose}
        >
            <Box sx={style}>
                {location.pathname === "/account/login" ? <LoginForm /> : <RegisterForm />}
            </Box>
        </Modal>
    );
};