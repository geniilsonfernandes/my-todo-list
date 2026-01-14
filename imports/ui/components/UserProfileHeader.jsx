
import React from "react";
import { Box, Avatar, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";


export const UserProfileHeader = () => {
    const { user, profile } = useAuth();
    const avatarLetter = profile?.name?.[0]?.toUpperCase() || "U";
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                p: 2,
                bgcolor: "primary.main",
                color: "primary.contrastText",
            }}
        >
            <Avatar
                src={profile?.photo || ""}
                alt={profile?.name}
                sx={{ width: 64, height: 64, mb: 1 }}
            >
                {!profile?.photo && avatarLetter}
            </Avatar>

            <Typography variant="h6" fontSize={14} fontWeight="bold" textAlign="center">
                {profile?.name || user?.emails?.[0]?.address}
            </Typography>

            <Typography
                variant="body2"
                color="inherit"
                sx={{ textAlign: "center", opacity: 0.85 }}
            >
                {user?.emails?.[0]?.address || "email@dominio.com"}
            </Typography>
        </Box>
    );
};