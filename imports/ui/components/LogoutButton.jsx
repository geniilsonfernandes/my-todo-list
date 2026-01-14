import React from "react";
import {
    IconButton,
    Popover,
    Typography,
    Box,
    Button
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const LogoutButton = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => setAnchorEl(null);

    const handleConfirmLogout = async () => {
        await logout();          
        handleClose();         
        navigate("/", { replace: true }); 
    };

    return (
        <>
            <IconButton
                color="inherit"
                edge="end"
                onClick={handleOpen}
                sx={{ ml: "auto" }}
            >
                <LogoutIcon />
            </IconButton>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <Box sx={{ p: 2, maxWidth: 220 }}>
                    <Typography fontWeight="bold">
                        Sair da conta?
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ my: 1 }}>
                        Você será desconectado do aplicativo.
                    </Typography>

                    <Box display="flex" justifyContent="flex-end" gap={1} mt={1}>
                        <Button size="small" onClick={handleClose}>
                            Cancelar
                        </Button>
                        <Button
                            size="small"
                            color="error"
                            variant="contained"
                            onClick={handleConfirmLogout}
                        >
                            Sair
                        </Button>
                    </Box>
                </Box>
            </Popover>
        </>
    );
};