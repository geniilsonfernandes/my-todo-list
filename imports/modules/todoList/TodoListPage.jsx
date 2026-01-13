import React from 'react';
import { List, Stack, Typography, Button, Container, Pagination, Skeleton, FormControlLabel, Checkbox } from '@mui/material';
import { TodoItem } from './components/TodoItem';
import { SearchBar } from './components/SearchBar';
import { useNavigate } from 'react-router-dom';
import { useTasksCount } from './hooks/useTasks';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '../../api/tasks/tasksCollection';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { EmptyState } from '../../ui/components/EmptyState';
import { showCompletedVar, searchQueryVar } from './reactiveVars';



export const TodoListPage = () => {
    const navigate = useNavigate();
    const [page, setPage] = React.useState(0);
    const showCompleted = useTracker(() => showCompletedVar.get());
    const query = useTracker(() => searchQueryVar.get());

    const limit = 4;
    const skip = page * limit;

    const { tasks, loading } = useTracker(() => {
        const hideCompleted = !showCompleted;
        const handler = Meteor.subscribe('tasks', { limit, skip, query, hideCompleted });
        const isLoading = !handler.ready();

        const selector = { owner: Meteor.userId() };
        if (hideCompleted) {
            selector.status = { $ne: 'completed' };
        }
        if (query && query.trim() !== '') {
            selector.todo = { $regex: query.trim(), $options: 'i' };
        }

        const data = isLoading ? [] : TasksCollection.find(selector, { sort: { createdAt: -1 } }).fetch();

        return { tasks: data, loading: isLoading };
    }, [page, query, showCompleted]);

    const { totalCount } = useTasksCount({ hideCompleted: !showCompleted }, [tasks]);

    return (
        <Container maxWidth="md"   >
            <Typography variant="h4" my={4} textAlign="center" fontSize={{ xs: 16, sm: 18, md: 24 }} fontWeight={600} gutterBottom>
                Tarefas Cadastradas {totalCount}
            </Typography>
            <SearchBar
                onSearch={(value) => searchQueryVar.set(value)}
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
                <Pagination count={Math.ceil(totalCount / 4)} page={page + 1} onChange={(_, value) => setPage(value - 1)} />
            </Stack>
            {tasks.length === 0 && !loading ? (
                <EmptyState
                    message="Nenhuma tarefa encontrada"
                    onAction={() => navigate('/new')}
                    actionText="Adicionar Tarefa"
                />
            ) : (
                <List sx={{ width: '100%' }}>
                    {tasks.map((item) => <TodoItem item={item} key={item._id} />)}
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
                onClick={() => navigate('/new')}
            >
                <AddIcon />
            </Fab>
        </Container>
    );
};  
