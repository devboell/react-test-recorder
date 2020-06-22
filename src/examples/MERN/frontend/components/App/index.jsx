/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react'

const App = () => {
  const [users, setUsers] = useState([])

  const fetchUsers = async () => {
    const response = await fetch('http://localhost:3001/users', {
      method: 'get',
    })
    const usersJSON = await response.json()

    setUsers(usersJSON.users)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <ul>
      {users.map((u) => (
        // eslint-disable-next-line no-underscore-dangle
        <li key={u._id}>{u.name}</li>
      ))}
    </ul>
  )
}

export default App
