


const url = "http://127.0.0.1:8000"

export const registerUser = async (data) => {
  const response = await fetch(`${url}/register/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })

  return response.json()
}


export const loginUser = async (data) => {
  const response = await fetch(`${url}/token/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })

  return response.json()
}


export const refresh = async (data) => {
  const response = await fetch(`${url}/refresh/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })

  return response.json()
}


export const getUserProfile = async (token) => {
  const response = await fetch(`${url}/api/getUserInfo/`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })

  return response.json()
}

export const getUserProjects = async (token) => {
  const response = await fetch(`${url}/api/projects/`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })

  return response.json()
}

export const addUserProject = async (token, data) => {
  const response = await fetch(`${url}/api/projects/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })

  return response.json()
}


export const updateUserProject = async (token, id, data) => {
  const response = await fetch(`${url}/api/projects/${id}/`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })

  return response.json()
}

export const deleteUserProject = async (token, id) => {
  const response = await fetch(`${url}/api/projects/${id}/`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  })

  return response.json()
}

// ------------- API Section ------------

export const addProjectApi = async (token, project_id, data) => {
  const response = await fetch(`${url}/api/projects/${project_id}/apis/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })

  return response.json()
}
