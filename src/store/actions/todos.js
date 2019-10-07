const API = process.env.REACT_APP_API;

const fetch = (payload) => {
  return {
    type: 'FETCH_TODOS',
    payload,
  };
};

// Thunk for handling async fetch
const fetchTodos = () => (dispatch) => {
  return fetch(`${API}/api/v1/todo`)
    .then((results) => results.json())
    .then((data) => dispatch(fetch(data)));
};

export default {
  fetchTodos,
};
