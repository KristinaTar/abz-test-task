
const BASE_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1/';

export const getUsers = (count = 6) => {
  return fetch(BASE_URL+'users?page=1&count=' + count)
    .then(response => response.json());

};

export const getPosition = () => {
  return fetch(BASE_URL + 'positions')
    .then(response => response.json());
};

const getToken = () => {
  return fetch(BASE_URL + 'token')
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

  return fetch(BASE_URL + 'users', {
    method: 'POST',
    body: formData,
    headers: {
      'Token': token,
    },
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    console.log(data)
      return data;
    }).catch(function (error) {
      throw (error);
    });
};