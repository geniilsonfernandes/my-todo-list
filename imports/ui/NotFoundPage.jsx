import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";

export const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <Container
            maxWidth="sm"
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
            }}
        >
            <Typography variant="h1" fontSize={{ xs: 64, sm: 96 }} fontWeight={700} color="primary">
                404
            </Typography>
            <Typography variant="h5" fontSize={{ xs: 18, sm: 24 }} fontWeight={500} gutterBottom>
                Página não encontrada
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={4}>
                Ops! A página que você está procurando não existe.
            </Typography>
            <Button variant="contained" color="primary" onClick={() => navigate("/dashboard")}>
                Voltar ao Dashboard
            </Button>
        </Container>
    );
};