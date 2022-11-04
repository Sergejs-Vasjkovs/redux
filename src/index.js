import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { titleChanged, taskDeleted, getTasks, getTaskLoadingStatus, loadTasks, createTask } from './store/task';
import configureStore from './store/store';
import { completedTask } from './store/task';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { getError } from './store/errors';

const store = configureStore();

const App = () => {
  const state = useSelector(getTasks());
  const isLoading = useSelector(getTaskLoadingStatus())
  const error = useSelector(getError())
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTasks())
  }, []);

  const changeTitle = (id) => {
    dispatch(titleChanged(id))
  }

  const deleteTask = (id) => {
    dispatch(taskDeleted(id))
  }

  const handlecreateTask = () => {
    dispatch(createTask())
  }

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (error) {
    return <h1>{error}</h1>
  }

  return <>
    <button onClick={handlecreateTask}>Create task</button>
    <ul>
      {state.map(element => (
        <li key={element.id}>
          <p>{element.title}</p>
          <p>{`Completed: ${element.completed}`}</p>
          <button onClick={() => dispatch(completedTask(element.id))}>Complete</button>
          <button onClick={() => changeTitle(element.id)}>Change title</button>
          <button onClick={() => deleteTask(element.id)}>Delete task</button>
          <hr></hr>
        </li>))}
    </ul>
  </>
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
