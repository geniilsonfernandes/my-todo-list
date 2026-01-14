import React, { useMemo, useState } from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Stack,
    Paper,
    IconButton,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../ui/context/AuthContext';
import { useCreateTask, useEditTask, useUpdateTaskStatus } from '../hooks/useTasks';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { taskSchema } from '../validation/taskValidation';
import { TaskStatus, TaskStatusEnum } from '../../../api/tasks/tasksMethods';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import { toast } from 'sonner';
import dayjs from 'dayjs';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const STATUS_CONCLUIDA = 'Concluída';
const STATUS_EM_ANDAMENTO = 'Em Andamento';
const STATUS_CADASTRADA = 'Cadastrada';

export const NewTask = () => {
    const data = useLoaderData();

    const { createTask, loading: createLoading } = useCreateTask();
    const { editTask, loading: editLoading } = useEditTask()
    const { updateTaskStatus, loading: updateTaskStatusLoading } = useUpdateTaskStatus();

    const { user } = useAuth();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = React.useState(!data);

    const variant = isEditing ? 'outlined' : 'filled';

    const defaultValues = React.useMemo(() => ({
        todo: data?.todo || '',
        description: data?.description || '',
        status: data?.status || TaskStatus[0],
        date: data?.date ? dayjs(data.date).format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD'),
        createdBy: data?.owner || user?._id || '',
    }), [data, user]);

    const { register, handleSubmit, control, formState: { errors }, setValue, watch } = useForm({
        resolver: zodResolver(taskSchema),
        defaultValues,
    });

    const onSubmit = async (formData) => {
        try {
            if (data) {
                await editTask(
                    data._id,
                    formData.todo,
                    formData.description,
                    formData.status,
                    new Date(formData.date)
                );
            } else {
                await createTask(
                    formData.todo,
                    formData.description,
                    formData.status,
                    new Date(formData.date)
                );
            }
            navigate(-1);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancel = () => navigate(-1);
    const toggleEdit = () => setIsEditing(prev => !prev);

    const handleStatusChange = (newStatus) => {
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
        setValue('status', newStatus);
        updateTaskStatus(data._id, newStatus);
    };
    const status = watch('status');

    return (
        <Container maxWidth="md" sx={{ mt: 8 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Stack direction="row" spacing={2} alignItems="center">
                    <IconButton onClick={handleCancel}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h4" fontSize={{
                        xs: '1.25rem',
                        sm: '1.5rem',
                        md: '1.75rem',
                        lg: '2rem',
                        xl: '2.25rem',
                    }} fontWeight={600}>
                        {data ? `${isEditing ? 'Editar' : 'Visualizar'} Tarefa` : 'Nova Tarefa'}
                    </Typography>
                </Stack>
                {data && (
                    <Button endIcon={isEditing ? <ArrowBackIcon /> : <EditIcon />} variant={isEditing ? 'outlined' : 'contained'} onClick={toggleEdit}>
                        {isEditing ? 'Visualizar' : 'Editar'}
                    </Button>
                )}
            </Box>
            {data
                &&
                <StatusButtons handleStatusChange={handleStatusChange} status={status} updateTaskStatusLoading={updateTaskStatusLoading} />
            }

            <Stack
                component="form"
                spacing={2}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
            >
                <TextField
                    label="Nome"
                    fullWidth
                    disabled={!isEditing}
                    variant={variant}
                    error={!!errors.todo}
                    helperText={errors.todo?.message}
                    {...register('todo')}
                />

                <TextField
                    label="Descrição"
                    fullWidth
                    multiline
                    rows={4}
                    disabled={!isEditing}
                    variant={variant}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    {...register('description')}
                />

                <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                        <FormControl fullWidth variant={variant} disabled={!isEditing}>
                            <InputLabel>Situação</InputLabel>
                            <Select
                                {...field}
                                label="Situação"
                            >
                                {TaskStatus.map(status => (
                                    <MenuItem key={status} value={status}>{status}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                />

                <Controller
                    name="date"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            label="Data"
                            type="date"
                            fullWidth
                            disabled={!isEditing}
                            variant={variant}
                            error={!!errors.date}
                            helperText={errors.date?.message}
                            {...field}
                        />
                    )}
                />

                <TextField
                    label="Criado por"
                    fullWidth
                    disabled
                    variant={variant}
                    {...register('createdBy')}
                    error={!!errors.createdBy}
                    helperText={errors.createdBy?.message}
                />
                {isEditing && (
                    <Box mt={3} display="flex" justifyContent="space-between" gap={2}>
                        <Button
                            variant="outlined"
                            endIcon={<CancelIcon />}
                            color="secondary"
                            onClick={toggleEdit}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            endIcon={<SaveIcon />}
                            color="primary"
                            disabled={createLoading || editLoading}
                            loading={createLoading || editLoading}
                        >
                            Salvar
                        </Button>
                    </Box>
                )}

            </Stack>
        </Container>
    );
};



export const StatusButtons = ({ status, handleStatusChange, updateTaskStatusLoading }) => {
    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);

    return (
        <Box mb={4}>
            <Box display="flex" justifyContent="flex-end" mb={1}>
                <Tooltip title="Como atualizar o status da tarefa" arrow>
                    <IconButton size="small" onClick={handleOpenDialog}>
                        <HelpOutlineIcon />
                    </IconButton>
                </Tooltip>
            </Box>

            {/* Botões de status */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
                <Button
                    variant="contained"
                    color="info"
                    fullWidth
                    startIcon={<PlayArrowIcon />}
                    onClick={() => handleStatusChange(TaskStatusEnum.IN_PROGRESS)}
                    disabled={status !== TaskStatusEnum.PENDING}
                    loading={updateTaskStatusLoading}
                >
                    Iniciar (Em Andamento)
                </Button>
                <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    startIcon={<CheckCircleIcon />}
                    onClick={() => handleStatusChange(TaskStatusEnum.COMPLETED)}
                    disabled={status !== TaskStatusEnum.IN_PROGRESS}
                    loading={updateTaskStatusLoading}
                >
                    Concluir
                </Button>
                <Button
                    variant="outlined"
                    color="warning"
                    fullWidth
                    startIcon={<RestartAltIcon />}
                    onClick={() => handleStatusChange(TaskStatusEnum.PENDING)}
                    disabled={status !== TaskStatusEnum.COMPLETED}
                    loading={updateTaskStatusLoading}
                >
                    Reiniciar (Cadastrada)
                </Button>
            </Stack>

            {/* Dialog explicativo */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Como atualizar o status da tarefa</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Use os botões para atualizar o status da tarefa. Cada botão só está ativo quando a tarefa estiver no status correspondente:
                        <ul>
                            <li><strong>Iniciar:</strong> só se estiver "Pendente"</li>
                            <li><strong>Concluir:</strong> só se estiver "Em Andamento"</li>
                            <li><strong>Reiniciar:</strong> só se estiver "Concluída"</li>
                        </ul>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Fechar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};