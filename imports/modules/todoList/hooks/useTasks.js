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



// THIS IS FOR COUNT TOTAL TASKS

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
  }, deps); // deps podem ser [tasks] ou vazio, dependendo da sua necessidade

  return { totalCount, loading };
};