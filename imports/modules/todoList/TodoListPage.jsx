import React from 'react';
import { Container, List, Typography } from '@mui/material';
import { TodoItem } from './components/TodoItem';
import { SearchBar } from './components/SearchBar';

const tasks = [
    { _id: 1, todo: 'Buy Milk', title: 'Groceries', owner: 'John Doe' },
    { _id: 2, todo: 'Walk the Dog', title: 'Chores', owner: 'Jane Doe' },
    { _id: 3, todo: 'Finish Report', title: 'Work', owner: 'John Doe' },
];


export const TodoListPage = () => {

    return (

        <Container maxWidth="md" >
            <Typography variant="h4" my={4} textAlign="center" fontSize={{ xs: 16, sm: 18, md: 24 }} fontWeight={600} gutterBottom>
                Tarefas Cadastradas
            </Typography>
            <SearchBar />
            <List sx={{ width: '100%' }} >
                {tasks.map((item) => (
                    <TodoItem item={item} key={item._id} />
                ))}
            </List>
        </Container>
    );
};



