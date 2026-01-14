import React from 'react';
import { Box, CardContent, Typography, Grid, Button, Container, useTheme, CircularProgress, Skeleton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { grey } from '@mui/material/colors';
import { useAuth } from '../../ui/context/AuthContext';
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton, Stack, Tooltip } from '@mui/material';

export const DashboardPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [analytics, setAnalytics] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        Meteor.call('tasks.analytics', (err, result) => {
            setLoading(false);
            if (err) {
                console.error(err);
            } else {
                setAnalytics(result);
            }
        });
    }, []);

    const cards = React.useMemo(() => {
        if (!analytics) return [];
        const { totalTasks, completedTasks, inProgressTasks } = analytics;
        return [
            {
                title: 'Total de Tarefas cadastradas',
                count: totalTasks,
                icon: <AssignmentIcon fontSize="large" color="primary" />,
                color: grey[100],
            },
            {
                title: 'Total de tarefas concluídas',
                count: completedTasks,
                icon: <CheckCircleIcon fontSize="large" color="success" />,
                color: grey[100],
            },
            {
                title: 'Total de tarefas a serem concluídas',
                count: inProgressTasks,
                icon: <PendingIcon fontSize="large" color="warning" />,
                color: grey[100],
            },
        ];
    }, [analytics]);

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Box my={8} display="flex" justifyContent="space-between" alignItems="flex-start">
                <Box>
                    <Typography variant="h4" fontSize={{ xs: 24, sm: 28, md: 32 }} fontWeight={600} gutterBottom>
                        Olá, {user?.emails?.[0]?.address || 'Usuário'}, seja bem-vindo!
                    </Typography>
                    <Typography variant="body1" fontSize={{ xs: 16, sm: 18, md: 20 }} color="text.secondary">
                        Aqui está sua lista de tarefas, adicione uma nova tarefa para começar!
                    </Typography>
                </Box>
            </Box>

            <Grid container spacing={2}>
                {(loading ? Array.from(new Array(3)) : cards).map((card, index) => (
                    <Grid item size={{
                        xs: 12,
                        sm: 6,
                        md: 6,
                    }} key={index}>
                        <Box
                            height={{
                                xs: 100,
                                sm: 200,
                                md: 200,
                            }}
                            sx={{ bgcolor: card?.color || "grey.100", borderRadius: 2 }}
                        >
                            <CardContent
                                sx={{
                                    display: "flex",
                                    height: "100%",
                                    flexDirection: "column",
                                    alignItems: "start",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Typography variant="subtitle1" fontSize={{ xs: 16, sm: 20 }} fontWeight={500}>
                                    {loading ? <Skeleton width="60%" /> : card.title}
                                </Typography>
                                <Typography variant="h3" fontSize={{ xs: 24, sm: 32, md: 48 }} fontWeight={700}>
                                    {loading ? <Skeleton width="40%" /> : card.count}
                                </Typography>
                            </CardContent>
                        </Box>
                    </Grid>
                ))}
                <Grid item size={{
                    xs: 12,
                    sm: 6,
                    md: 6,
                }}>
                    <ActionCard onClick={() => navigate('/tasks')} />
                </Grid>
            </Grid>


        </Container >
    );
};



const ActionCard = ({ onClick }) => {
    const theme = useTheme();
    return (
        <Box
            height={{
                xs: 100,
                sm: 200,
                md: 200,
            }}
            sx={{
                bgcolor: theme.palette.background.paper, borderRadius: 2, cursor: 'pointer',
                transition: 'transform 0.2s ease-in-out',
                border: '2px dashed',
                borderColor: theme.palette.grey[200],

                '&:hover': {
                    transform: 'translateY(-4px)',
                    backgroundColor: theme.palette.grey[200],
                    borderColor: theme.palette.grey[300],
                },
            }} onClick={onClick}>
            <CardContent sx={{ display: 'flex', height: '100%', flexDirection: 'column', alignItems: 'start', justifyContent: 'space-between' }}>
                <Typography variant="subtitle1" fontSize={{ xs: 16, sm: 20, }} fontWeight={500}>
                    Visualizar todas as tarefas
                </Typography>
                <ArrowForwardIcon sx={{ fontSize: { xs: 24, sm: 32, md: 48 } }} />

            </CardContent>
        </Box>
    );
};