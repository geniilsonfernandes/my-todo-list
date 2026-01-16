import { Avatar, Box, Skeleton, Typography } from "@mui/material";
import React from "react";
import { useAuth } from "../context/AuthContext";

export const UserProfileHeader = () => {
    const { user } = useAuth();
    const [loading, setLoading] = React.useState(true);
    const [profile, setProfile] = React.useState(null);
    const avatarLetter = profile?.name?.[0]?.toUpperCase() || "U";

    React.useEffect(() => {
        Meteor.call('profiles.get', (err, result) => {
            setLoading(false);
            if (err) {
                console.error(err);
            } else {
                setProfile(result);
            }
        });
    }, []);

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
            {loading ? (
                <Skeleton
                    variant="circular"
                    width={64}
                    height={64}
                    sx={{ mb: 1, bgcolor: "rgba(255, 255, 255, 0.2)" }}
                />
            ) : (
                    <Avatar
                        src={profile?.photo || ""}
                        alt={profile?.name}
                        sx={{ width: 64, height: 64, mb: 1 }}
                    >
                        {!profile?.photo && avatarLetter}
                    </Avatar>
            )}

            {loading ? (
                <Skeleton
                    variant="text"
                    width="80%"
                    height={24}
                    sx={{ bgcolor: "rgba(255, 255, 255, 0.2)" }}
                />
            ) : (
                    <Typography variant="h6" fontSize={14} fontWeight="bold" textAlign="center">
                        {profile?.name || user?.emails?.[0]?.address}
                    </Typography>
            )}

            {loading ? (
                <Skeleton
                    variant="text"
                    width="60%"
                    height={20}
                    sx={{ bgcolor: "rgba(255, 255, 255, 0.2)" }}
                />
            ) : (
                    <Typography
                        variant="body2"
                        color="inherit"
                        sx={{ textAlign: "center", opacity: 0.85 }}
                    >
                        {user?.emails?.[0]?.address || "email@dominio.com"}
                    </Typography>
            )}
        </Box>
    );
};