import React, { useMemo } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Menu,
    MenuItem,
    useTheme,
    Typography,
    Box
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EventIcon from '@mui/icons-material/Event';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { useDeleteTask } from '../hooks/useTasks';
import { TaskStatusEnum } from '../../../api/tasks/tasksMethods';
import { toast } from 'sonner';

import TaskAltIcon from '@mui/icons-material/TaskAlt';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';

export const TaskItem = ({ item }) => {
    const theme = useTheme();
    const { removeTask, loading } = useDeleteTask();
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openDialog, setOpenDialog] = React.useState(false);

    const menuOpen = Boolean(anchorEl);

    const statusColor = useMemo(() => {
        switch (item.status) {
            case TaskStatusEnum.COMPLETED:
                return 'success';
            case TaskStatusEnum.IN_PROGRESS:
                return 'info';
            default:
                return 'warning';
        }
    }, [item.status]);
    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleEdit = () => {
        navigate(`/tasks/edit/${item._id}`);
        handleMenuClose();
    };

    const handleDeleteClick = () => {
        setOpenDialog(true);
        handleMenuClose();
    };

    const handleConfirmDelete = async () => {
        try {
            await removeTask(item._id);
            toast.success('Tarefa removida!');
        } catch (err) {
            console.error(err);
            toast.error('Erro ao remover tarefa.');
        } finally {
            setOpenDialog(false);
        }
    };

    const handleCancelDelete = () => setOpenDialog(false);

    return (
        <ListItem
            dense
            sx={{ background: theme.palette.grey[100], borderRadius: 2, mb: 1, px: 3 }}
            secondaryAction={
                <Menu
                    id={`menu-${item._id}`}
                    anchorEl={anchorEl}
                    open={menuOpen}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={handleEdit}>Editar</MenuItem>
                    <MenuItem onClick={handleDeleteClick}>Remover</MenuItem>
                </Menu>
            }

        >
            <ListItemIcon>
                {item.status === TaskStatusEnum.COMPLETED && <TaskAltIcon color={statusColor} />}
                {item.status === TaskStatusEnum.IN_PROGRESS && <QueryBuilderIcon color={statusColor} />}
                {item.status === TaskStatusEnum.PENDING && <HourglassBottomIcon color={statusColor} />}
            </ListItemIcon>

            <ListItemText
                primary={item.todo}
                secondary={item?.user?.emails?.[0]?.address || item.status}

            />
           

            <IconButton
                aria-controls={menuOpen ? `menu-${item._id}` : undefined}
                aria-haspopup="true"
                aria-expanded={menuOpen ? 'true' : undefined}
                onClick={handleMenuOpen}
            >
                <MoreVertIcon />
            </IconButton>



            <Dialog
                open={openDialog}
                onClose={handleCancelDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                
            >
                <DialogTitle id="alert-dialog-title">Tem certeza?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Deseja realmente remover este item?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        onClick={handleCancelDelete}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={handleConfirmDelete}
                        disabled={loading}
                    >
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </ListItem>
    );
};