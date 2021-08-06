import axios from 'axios';
// const baseUrl = '/api/persons'
const baseUrl = 'http://localhost:3001/api/persons';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
}

const create = newContact => {
  const request = axios.post(baseUrl, newContact);
  return request.then(response => response.data);
}

const edit = (id, newContact) => {
  const request = axios.put(`${baseUrl}/${id}`, newContact);
  return request.then(response => response.data);
}

const remove = id => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then(response => response.data);
}

const personService = { getAll, create, edit, remove };

export default personService;