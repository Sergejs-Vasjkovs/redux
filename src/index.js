import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import * as actions from "./store/actions"
import { initiateStore } from './store/store';

const store = initiateStore();

const App = () => {
  useEffect(() => {
    store.subscribe(() => {
      setState(store.getState())
    });
  }, []);

  const [state, setState] = useState(store.getState());

  const completedTask = (id) => {
    store.dispatch(actions.taskCompleted(id))
  };

  const changeTitle = (id) => {
    store.dispatch(actions.titleChanged(id))
  }

  const deleteTask = (id) => {
    store.dispatch(actions.taskDeleted(id))
  }

  return <>
    <ul>
      {state.map(element => (
        <li key={element.id}>
          <p>{element.title}</p>
          <p>{`Completed: ${element.completed}`}</p>
          <button onClick={() => completedTask(element.id)}>Complete</button>
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
    <App />
  </React.StrictMode>
);
