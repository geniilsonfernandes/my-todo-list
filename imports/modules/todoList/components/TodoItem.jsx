import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, ListItem, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const TodoItem = ({ item }) => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openDialog, setOpenDialog] = React.useState(false);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDeleteClick = () => {
        setOpenDialog(true);
        handleClose();
    };

    const handleConfirmDelete = () => {
        setOpenDialog(false);
        console.log('Deleted item:', item._id);
    };

    const handleEditClick = () => {
        navigate(`/edit/${item._id}`);
        handleClose();
    };

    const handleCancelDelete = () => {
        setOpenDialog(false);
    };

    return (
        <ListItem
            key={item._id}
            sx={{ background: grey[100], borderRadius: 2, mb: 1 }}
        >
            <ListItemIcon>
                <Checkbox
                    edge="start"
                    tabIndex={-1}
                    disableRipple
                />
            </ListItemIcon>
            <ListItemText primary={item.title} secondary={item.todo} />
            <IconButton
                id={`basic-button-${item._id}`}
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}

            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}

            >
                <MenuItem onClick={handleEditClick}>editar</MenuItem>
                <MenuItem onClick={handleDeleteClick}>Remover</MenuItem>
            </Menu>

            <Dialog
                open={openDialog}
                onClose={handleCancelDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Tem certeza?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Deseja realmente remover este item?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete}>Cancelar</Button>
                    <Button onClick={handleConfirmDelete} autoFocus>
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </ListItem>
    );
};