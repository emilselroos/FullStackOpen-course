import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = newToken => {
	token = `bearer ${newToken}`;
};

const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then(response => response.data);
};

const edit = async (newObject) => {
	const config = {
		headers: { Authorization: token },
	};

	console.log(newObject);

	const request = await axios.put(`${baseUrl}/${newObject.id}`, newObject.newBlog, config);
	return request;
};

const remove = async (id) => {
	const config = {
		headers: { Authorization: token },
	};
	await axios.delete(`${baseUrl}/${id}`, config);
};

const create = async (newObject) => {
	const config = {
		headers: { Authorization: token },
	};

	const response = await axios.post(baseUrl, newObject, config);

	return response.data;
};

const blogsService = {
	getAll,
	create,
	setToken,
	edit,
	remove
};

export default blogsService;