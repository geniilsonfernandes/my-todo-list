import React from 'react';
import { List, Stack, Typography, Button, Container, Pagination, Skeleton, FormControlLabel, Checkbox } from '@mui/material';
import { TaskItem } from './components/TaskItem';
import { SearchBar } from './components/SearchBar';
import { useNavigate } from 'react-router-dom';
import { useTasksCount } from './hooks/useTasks';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '../../api/tasks/tasksCollection';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { EmptyState } from '../../ui/components/EmptyState';
import { showCompletedVar, searchQueryVar, currentPageVar } from './reactiveVars';



export const ListTasks = () => {
    const navigate = useNavigate();
    const showCompleted = useTracker(() => showCompletedVar.get());
    const query = useTracker(() => searchQueryVar.get());
    const page = useTracker(() => currentPageVar.get());

    const limit = 4;
    const skip = page * limit;

    const { tasks, loading } = useTracker(() => {
        const handler = Meteor.subscribe('tasks.all', { limit, skip, query, showCompleted });
        const isLoading = !handler.ready();

        const data = isLoading
            ? []
            : TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch();

        return { tasks: data, loading: isLoading };
    }, [page, query, showCompleted]);

    const { totalCount } = useTasksCount({ showCompleted }, [tasks]);


    React.useEffect(() => {
        
        return () => {
            currentPageVar.set(0);
            searchQueryVar.set('');
            showCompletedVar.set(false);
        };
    }, []);

    return (
        <Container maxWidth="md" sx={{ mt: 8 }} >
            <Typography variant="h4" my={4} textAlign="center" fontSize={{ xs: 16, sm: 18, md: 24 }} fontWeight={600} gutterBottom>
                Tarefas Cadastradas
            </Typography>
            <SearchBar
                onSearch={(value) => searchQueryVar.set(value)}
                loading={loading}
            />
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={showCompleted}
                            onChange={(e) => showCompletedVar.set(e.target.checked)}
                        />
                    }
                    label="Mostrar concluídas"
                />
                <Pagination count={Math.ceil(totalCount / 4)} page={page + 1} onChange={(_, value) => currentPageVar.set(value - 1)} />
            </Stack>
            {loading ? (
                <List sx={{ width: '100%' }}>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton
                            key={index}
                            variant="rectangular"
                            height={60}
                            sx={{ mb: 1, borderRadius: 1 }}
                        />
                    ))}
                </List>
            ) : tasks.length === 0 ? (
                <EmptyState
                    message="Nenhuma tarefa encontrada"
                    onAction={() => navigate('/new')}
                    actionText="Adicionar Tarefa"
                />
            ) : (
                <List sx={{ width: '100%' }}>
                            {tasks.slice(0, 4).map((item) => (
                                <TaskItem item={item} key={item._id} />
                            ))}
                </List>
            )}
            <Fab
                color="primary"
                aria-label="add"
                sx={{
                    position: 'fixed',
                    bottom: { xs: 16, sm: 32 },
                    right: { xs: 16, sm: 32 }
                }}
                onClick={() => navigate('/tasks/new')}
            >
                <AddIcon />
            </Fab>
        </Container>
    );
};  
