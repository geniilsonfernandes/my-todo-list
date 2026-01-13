import React from 'react';
import { Container, Typography, TextField, Button, Box, Select, MenuItem, InputLabel, FormControl, FormHelperText } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../ui/context/AuthContext';
import { useCreateTask } from './hooks/useTasks';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { taskSchema } from './validation/taskValidation';
import { TaskStatus } from '../../api/tasks/tasksMethods';

// Status Constants


export const NewPage = () => {
    const { createTask, loading } = useCreateTask();
    const { userEmail } = useAuthContext();
    const navigate = useNavigate();

    const { register, handleSubmit, control, formState: { errors } } = useForm({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            todo: Math.random().toString(36).substring(7),
            description: Math.random().toString(36).substring(7),
            status: TaskStatus[0],
            date: new Date().toISOString().split('T')[0], // Default today
        }
    });

    const onSubmit = (data) => {
        // createTask(todo, description, status, date)
        createTask(data.todo, data.description, data.status, new Date(data.date)).then(() => {
       
        }).catch((error) => {
            console.log(error);
        });
 
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Box mb={4} display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h4" fontSize={{
                    xs: '.5rem',
                    sm: '1rem',
                    md: '1.5rem',
                }} fontWeight={600}>
                    Nova Tarefa
                </Typography>
            </Box>

            <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Nome"
                    variant='outlined'
                    {...register('todo')}
                    error={!!errors.todo}
                    helperText={errors.todo?.message}
                />

                <TextField
                    fullWidth
                    margin="normal"
                    label="Descrição"
                    multiline
                    rows={4}
                    variant='outlined'
                    {...register('description')}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                />

                <FormControl fullWidth margin="normal" variant='outlined' error={!!errors.status}>
                    <InputLabel>Situação</InputLabel>
                    <Controller
                        name="status"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                label="Situação"
                            >
                                {TaskStatus.map((status) => (
                                    <MenuItem key={status} value={status}>{status}</MenuItem>
                                ))}
                            </Select>
                        )}
                    />
                    <FormHelperText>{errors.status?.message}</FormHelperText>
                </FormControl>

                <TextField
                    fullWidth
                    margin="normal"
                    label="Data"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    variant='outlined'
                    {...register('date')}
                    error={!!errors.date}
                    helperText={errors.date?.message}
                />

                <TextField
                    fullWidth
                    margin="normal"
                    label="Criado por"
                    variant='outlined'
                    disabled
                    value={userEmail || ''}
                />
                <Box mt={3} display="flex" justifyContent="space-between" gap={2}>
                    <Button variant="outlined" endIcon={<CancelIcon />} color="secondary" onClick={handleCancel} disabled={loading}>
                        Cancelar
                    </Button>
                    <Button type="submit" variant="contained" endIcon={<SaveIcon />} color="primary" disabled={loading}>
                        Salvar
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};