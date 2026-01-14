
import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";

export const ErrorPage = () => {
    const navigate = useNavigate();
    const error = useRouteError();

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
            <Typography variant="h1" fontSize={{ xs: 48, sm: 72 }} fontWeight={700} color="error">
                😢 Oops!
            </Typography>
            <Typography variant="h5" fontSize={{ xs: 18, sm: 24 }} fontWeight={500} gutterBottom>
                Algo deu errado
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={4}>
                {error?.statusText || error?.message || "Não foi possível carregar esta página."}
            </Typography>
            <Button variant="contained" color="primary" onClick={() => navigate("/dashboard")}>
                Voltar ao Dashboard
            </Button>
        </Container>
    );
};