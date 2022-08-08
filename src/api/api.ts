const BASE_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=';

export const getUsers = (count = 6) => {
  return fetch(BASE_URL + count)
    .then(response => response.json());
};

export const getPosition = () => {
  return fetch('https://frontend-test-assignment-api.abz.agency/api/v1/positions')
    .then(response => response.json());
};

const getToken = () => {
  return fetch('https://frontend-test-assignment-api.abz.agency/api/v1/token')
    .then(response => response.json())
    .then(data => data.token)
    .catch(function (error) {
      throw (error);
    });
};

export const addNewUser = async (
  name: string,
  email: string,
  phone: string,
  selectedPosition: number,
  file: File
) => {
  const token = await getToken();
  const formData = new FormData()
  formData.append('position_id', String(selectedPosition)); 
  formData.append('name', name); 
  formData.append('email', email); 
  formData.append('phone', phone); 
  formData.append('photo', file);

  return fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
    method: 'POST',
    body: formData,
    headers: {
      'Token': token,
    },
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
      return data;
    }).catch(function (error) {
      throw (error);
    });
};