import { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { toast } from 'sonner';
import { TaskStatus } from '../../../api/tasks/tasksMethods';

export const useCreateTask = () => {
  const [loading, setLoading] = useState(false);

  const createTask = async (todo, description, status = 'pending', date = new Date()) => {
    if (!TaskStatus.includes(status)) return toast.error('Status inválido');
    setLoading(true);
    try {
      await Meteor.callAsync('tasks.create', todo, description, status, date);
      toast.success('Tarefa criada!');
    } catch (err) {
      toast.error(err.reason);
    } finally {
      setLoading(false);
    }
  };

  return { createTask, loading };
};


export const useUpdateTaskStatus = () => {
  const [loading, setLoading] = useState(false);

  const updateTaskStatus = async (taskId, status) => {
    if (!TaskStatus.includes(status)) return toast.error('Status inválido');
    setLoading(true);
    try {
      await Meteor.callAsync('tasks.updateStatus', taskId, status);
      toast.success('Status atualizado!');
    } catch (err) {
      toast.error(err.reason);
    } finally {
      setLoading(false);
    }
  };

  return { updateTaskStatus, loading };
};


export const useEditTask = () => {
  const [loading, setLoading] = useState(false);

  const editTask = async (taskId, todo, description, status = 'pending', date = new Date()) => {
    if (!TaskStatus.includes(status)) return toast.error('Status inválido');
    setLoading(true);
    try {
      await Meteor.callAsync('tasks.update', taskId, todo, description, status, date);
      toast.success('Tarefa editada!');
    } catch (err) {
      toast.error(err.reason);
    } finally {
      setLoading(false);
    }
  };

  return { editTask, loading };
};

// THIS IS FOR DELETE TASK
export const useDeleteTask = () => {
  const [loading, setLoading] = useState(false);

  const removeTask = async (taskId) => {
    setLoading(true);
    try {
      await Meteor.callAsync('tasks.remove', taskId);
      toast.success('Tarefa removida!');
    } catch (err) {
      toast.error(err.reason || 'Erro ao remover tarefa');
    } finally {
      setLoading(false);
    }
  };

  return { removeTask, loading };
};




export const useTasksCount = (filters = {}, deps = []) => {
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchCount = async () => {
      setLoading(true);
      try {
        const count = await Meteor.callAsync('tasks.count', filters);
        if (isMounted) setTotalCount(count);
      } catch (err) {
        console.error('Error fetching tasks count:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCount();

    return () => {
      isMounted = false;
    };
  }, deps); 

  return { totalCount, loading };
};