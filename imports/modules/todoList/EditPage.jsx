import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; 
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import { toast } from 'sonner'


// Mock data to simulate fetching a task
const MOCK_TASKS = [
    { _id: 1, todo: 'Buy Milk', description: 'Go to the store and buy milk', status: 'Em Andamento', date: '2026-01-12', owner: 'John Doe' },
    { _id: 2, todo: 'Walk the Dog', description: 'Take the dog for a walk in the park', status: 'Concluída', date: '2026-01-12', owner: 'Jane Doe' },
    { _id: 3, todo: 'Finish Report', description: 'Complete the monthly report', status: 'Em Andamento', date: '2026-01-15', owner: 'John Doe' },
];

export const EditPage = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [task, setTask] = useState(null);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        // Simulate fetch
        const foundTask = MOCK_TASKS.find(t => t._id === parseInt(id));
        if (foundTask) {
            setTask(foundTask);
            setFormData(foundTask);
        }
    }, [id]);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        if (!isEditing) {
            setFormData(task); // Reset form data when entering edit mode (or just ensuring sync)
        }
    };

    const handleSave = () => {

        toast.success('Tarefa salva com sucesso!');
        navigate('/tasks');
    };

    const handleCancel = () => {
        setFormData(task);
        setIsEditing(false);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
                    {isEditing ? 'Editar Tarefa:' + task.todo : 'Visualizar Tarefa:' + task.todo}
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
                        <MenuItem value="Em Andamento">Em Andamento</MenuItem>
                        <MenuItem value="Concluída">Concluída</MenuItem>
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

                {isEditing && (
                    <Box mt={3} display="flex" justifyContent="space-between" gap={2}>
                        <Button variant="outlined" endIcon={<CancelIcon />} color="secondary" onClick={handleCancel}>
                            Cancelar
                        </Button>
                        <Button variant="contained" endIcon={<SaveIcon />} color="primary" onClick={handleSave}>
                            Salvar
                        </Button>
                    </Box>
                )}
                {!isEditing && (
                    <Box mt={3} display="flex" justifyContent="flex-start">
                        <Button startIcon={<ArrowBackIcon />} variant="text" onClick={() => navigate('/tasks')}>
                            Voltar para Lista
                        </Button>
                    </Box>
                )}
            </Box>
        </Container>
    );
};