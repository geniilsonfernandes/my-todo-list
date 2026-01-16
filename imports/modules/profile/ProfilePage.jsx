import { zodResolver } from '@hookform/resolvers/zod';
import { PhotoCamera } from '@mui/icons-material';
import {
    Avatar,
    Box,
    Button,
    Container,
    MenuItem,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router-dom';
import { z } from 'zod';
import { useAuth } from '../../ui/context/AuthContext';

export const profileSchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório'),
    email: z.email('Email inválido').min(1, 'Email é obrigatório'),
    birthDate: z.string().min(1, 'Data de nascimento é obrigatória'),
    gender: z.string().min(1, 'Sexo é obrigatório'),
    company: z.string().min(1, 'Empresa é obrigatória'),
    photo: z.string().optional(), // base64 string
});

export const ProfilePage = () => {
    const profile = useLoaderData();
    const [photoPreview, setPhotoPreview] = useState(null);
    const { user, saveProfile } = useAuth();


    const defaultValues = React.useMemo(() => {
        return {
            name: profile?.name || '',
            email: profile?.email || user?.emails[0].address || '',
            birthDate: profile?.birthDate || '',
            gender: profile?.gender || '',
            company: profile?.company || '',
            photo: profile?.photo || '',
        };
    }, [profile, user]);

    const { control, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(profileSchema),
        defaultValues
    });

    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setPhotoPreview(base64String);
                setValue('photo', base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (data) => {
       await saveProfile(data);
    };


    React.useEffect(() => {
        if (profile?.photo) {
            const image = profile.photo;
            setPhotoPreview(image);
        }
    }, [profile]);



    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Typography variant="h4" component="h1" fontSize={{ xs: 24, sm: 28, md: 32 }} fontWeight={600} gutterBottom align="center">
                Perfil do Usuário
            </Typography>

            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                <Stack spacing={3}>

                    {/* Foto Upload */}
                    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                        <Avatar
                            src={photoPreview}
                            alt="Foto do Perfil"
                            sx={{ width: 100, height: 100 }}
                        />
                        <Button
                            component="label"
                            variant="outlined"
                            startIcon={<PhotoCamera />}
                        >
                            Upload Foto
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handlePhotoChange}
                            />
                        </Button>
                    </Box>

                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Nome"
                                fullWidth
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />
                        )}
                    />

                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                disabled
                                label="Email"
                                type="email"
                                fullWidth
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        )}
                    />

                    <Controller
                        name="birthDate"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Data de Nascimento"
                                type="date"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                error={!!errors.birthDate}
                                helperText={errors.birthDate?.message}
                            />
                        )}
                    />

                    <Controller
                        name="gender"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                select
                                label="Sexo"
                                fullWidth
                                error={!!errors.gender}
                                helperText={errors.gender?.message}
                            >
                                <MenuItem value="Masculino">Masculino</MenuItem>
                                <MenuItem value="Feminino">Feminino</MenuItem>
                                <MenuItem value="Outro">Outro</MenuItem>
                            </TextField>
                        )}
                    />

                    <Controller
                        name="company"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Empresa"
                                fullWidth
                                error={!!errors.company}
                                helperText={errors.company?.message}
                            />
                        )}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                        disabled={isSubmitting}
                        loading={isSubmitting}
                    >
                        Salvar
                    </Button>
                </Stack>
            </Box>
        </Container>
    );
};