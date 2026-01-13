import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Box, Select, MenuItem, InputLabel, FormControl, Stack, Paper } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { toast } from 'sonner'


// Status Constants
const STATUS_CADASTRADA = 'Cadastrada';
const STATUS_EM_ANDAMENTO = 'Em Andamento';
const STATUS_CONCLUIDA = 'Concluída';

const STATUS = [
    { value: STATUS_CADASTRADA, label: STATUS_CADASTRADA, color: 'primary' },
    { value: STATUS_EM_ANDAMENTO, label: STATUS_EM_ANDAMENTO, color: 'warning' },
    { value: STATUS_CONCLUIDA, label: STATUS_CONCLUIDA, color: 'success' },
];


export const EditPage = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [task, setTask] = useState(null);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    React.useEffect(() => {
        if (!id) return;

        setLoading(true);
        Meteor.call('tasks.getOne', id, (err, result) => {
            if (err) {
                setError(err.reason);
                setTask(null);
            } else {
                setTask(result);
            }
            setLoading(false);
        });
    }, [id]);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        if (!isEditing) {
            setFormData(task); // Reset form data when entering edit mode (or just ensuring sync)
        }
    };

    const handleSave = () => {
        setTask(formData);
        setIsEditing(false);
        toast.success('Tarefa salva com sucesso!');
        // navigate('/tasks'); // Staying on page to see changes or navigating back? User previous edit removed navigate.
    };

    const handleCancel = () => {
        setFormData(task);
        setIsEditing(false);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleStatusChange = (newStatus) => {
        const updatedTask = { ...task, status: newStatus };
        switch (newStatus) {
            case STATUS_CADASTRADA:
                toast.warning('Tarefa movida para: ' + newStatus);
                break;
            case STATUS_EM_ANDAMENTO:
                toast.success('Tarefa movida para: ' + newStatus);
                break;
            case STATUS_CONCLUIDA:
                toast.info('Tarefa movida para: ' + newStatus);
                break;
        }

        setTask(updatedTask);
        setFormData(updatedTask);
    };

    if (!task) {
        return <Container><Typography>Tarefa não encontrada.</Typography></Container>;
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" fontSize={{
                    xs: '.5rem',
                    sm: '1rem',
                    md: '1.5rem',
                }} fontWeight={600}>
                    {isEditing ? 'Editar Tarefa: ' + task.todo : 'Visualizar Tarefa: ' + task.todo}
                </Typography>
                {!isEditing && (
                    <Button endIcon={<EditIcon />} variant="contained" onClick={handleEditToggle}>
                        Editar
                    </Button>
                )}
            </Box>

            <Box component="form" noValidate autoComplete="off">
                <TextField
                    fullWidth
                    margin="normal"
                    label="Nome"
                    name="todo"
                    value={isEditing ? formData.todo : task.todo}
                    onChange={handleChange}
                    disabled={!isEditing}
                    variant={isEditing ? 'outlined' : 'filled'}
                />

                <TextField
                    fullWidth
                    margin="normal"
                    label="Descrição"
                    name="description"
                    multiline
                    rows={4}
                    value={isEditing ? formData.description : (task.description || '')}
                    onChange={handleChange}
                    disabled={!isEditing}
                    variant={isEditing ? 'outlined' : 'filled'}
                />

                <FormControl fullWidth margin="normal" disabled={!isEditing} variant={isEditing ? 'outlined' : 'filled'}>
                    <InputLabel>Situação</InputLabel>
                    <Select
                        label="Situação"
                        name="status"
                        value={isEditing ? formData.status : task.status}
                        onChange={handleChange}
                    >
                        <MenuItem value={STATUS_CADASTRADA}>{STATUS_CADASTRADA}</MenuItem>
                        <MenuItem value={STATUS_EM_ANDAMENTO}>{STATUS_EM_ANDAMENTO}</MenuItem>
                        <MenuItem value={STATUS_CONCLUIDA}>{STATUS_CONCLUIDA}</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    fullWidth
                    margin="normal"
                    label="Data"
                    name="date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={isEditing ? formData.date : task.date}
                    onChange={handleChange}
                    disabled={!isEditing}
                    variant={isEditing ? 'outlined' : 'filled'}
                />

                <TextField
                    fullWidth
                    margin="normal"
                    label="Criado por"
                    name="owner"
                    value={isEditing ? formData.owner : task.owner}
                    onChange={handleChange}
                    disabled={!isEditing} // Often owner isn't editable, but keeping it consistent with request for now or making it read-only
                    variant={isEditing ? 'outlined' : 'filled'}
                />

                {isEditing ? (
                    <Box mt={3} display="flex" justifyContent="space-between" gap={2}>
                        <Button variant="outlined" endIcon={<CancelIcon />} color="secondary" onClick={handleCancel}>
                            Cancelar
                        </Button>
                        <Button variant="contained" endIcon={<SaveIcon />} color="primary" onClick={handleSave}>
                            Salvar
                        </Button>
                    </Box>
                ) : (

                        <Paper sx={{ p: 2 }} >
                        <Box >

                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={3} justifyContent="center">
                                <Button
                                    variant="contained"
                                    color="info"
                                    fullWidth
                                    startIcon={<PlayArrowIcon />}
                                    disabled={task.status !== STATUS_CADASTRADA}
                                    onClick={() => handleStatusChange(STATUS_EM_ANDAMENTO)}
                                >
                                    Iniciar (Em Andamento)
                                </Button>
                                <Button
                                    variant="contained"
                                    color="success"
                                    fullWidth
                                    startIcon={<CheckCircleIcon />}
                                    disabled={task.status !== STATUS_EM_ANDAMENTO}
                                    onClick={() => handleStatusChange(STATUS_CONCLUIDA)}
                                >
                                    Concluir
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="warning"
                                    fullWidth
                                    startIcon={<RestartAltIcon />}
                                    disabled={task.status === STATUS_CADASTRADA}
                                    onClick={() => handleStatusChange(STATUS_CADASTRADA)}
                                >
                                    Reiniciar (Cadastrada)
                                </Button>
                            </Stack>

                            <Box display="flex" justifyContent="flex-start">
                                <Button startIcon={<ArrowBackIcon />} variant="text" onClick={() => navigate('/tasks')}>
                                    Voltar para Lista
                                </Button>
                            </Box>
                            </Box>
                        </Paper>
                )}
            </Box>
        </Container>
    );
};