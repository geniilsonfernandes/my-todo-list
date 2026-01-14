import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import {
    Box,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    AppBar,
    Typography,
    IconButton,
} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import { useAuth } from "../ui/context/AuthContext";
import { LogoutButton } from "../ui/components/LogoutButton";
import { UserProfileHeader } from "../ui/components/UserProfileHeader";



const drawerWidth = 220;



export const PrivateRoute = ({ redirectTo = "/" }) => {
    const { user, isLoading } = useAuth();
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);

    if (isLoading) return <p>Loading...</p>;
    if (!user) return <Navigate to={redirectTo} replace />;

    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

    const menuItems = [
        { text: "Home", icon: <HomeIcon />, path: "/dashboard" },
        { text: "Perfil", icon: <PersonIcon />, path: "/profile" },
    ];

    const drawer = (
        <Box>
            <Toolbar>
                <Typography variant="h6" fontWeight="bold">
                    TaskApp
                </Typography>
            </Toolbar>
            <UserProfileHeader />
            <List>
                {menuItems.map((item) => (
                    <ListItemButton
                        key={item.text}
                        onClick={() => {
                            navigate(item.path);
                            setMobileOpen(false);
                        }}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItemButton>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>

            <AppBar position="fixed" color="default" sx={{ zIndex: 1201 }}>
                <Toolbar

                >
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">TaskApp</Typography>
                    <LogoutButton />
                </Toolbar>
            </AppBar>

            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                sx={{
                    '& .MuiDrawer-paper': { width: drawerWidth }
                }}
            >
                {drawer}
            </Drawer>

            {/* Conteúdo das rotas */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    mt: { xs: 7, sm: 0 }
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
};