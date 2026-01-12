import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Container, List, Typography } from '@mui/material';
import { TodoItem } from './components/TodoItem';
import { SearchBar } from './components/SearchBar';

const tasks = [
    { _id: 1, todo: 'Buy Milk', title: 'Groceries', owner: 'John Doe' },
    { _id: 2, todo: 'Walk the Dog', title: 'Chores', owner: 'Jane Doe' },
    { _id: 3, todo: 'Finish Report', title: 'Work', owner: 'John Doe' },
];


export const TodoListPage = () => {

    return (

        <Container maxWidth="md">
            <Welcome />

            <SearchBar />
            <List sx={{ width: '100%' }} >
                {tasks.map((item) => (
                    <TodoItem item={item} key={item._id} />
                ))}
            </List>
        </Container>
    );
};



const Welcome = () => {
    return (
        <Box my={4}>
            <Typography variant="h4" fontSize={{ xs: 24, sm: 32, md: 48 }} fontWeight={600} gutterBottom>
                Olá, seja bem-vindo!
            </Typography>
            <Typography variant="h6" fontSize={{ xs: 14, sm: 16, md: 16 }} fontWeight={400} gutterBottom>
                Aqui está sua lista de tarefas, adicione uma nova tarefa para começar!
            </Typography>
            <Button variant="text" color="secondary" endIcon={<AddIcon />} sx={{ mt: 2 }}>
                Adicionar Tarefa
            </Button>
        </Box>
    );
};


