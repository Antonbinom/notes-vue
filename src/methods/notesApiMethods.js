import axios from 'axios'
import store from '@/store/index.js'

const url = process.env.VUE_APP_API_URL

export const getAll = async () => {
  if (localStorage.getItem('token')) {
    const token = localStorage.getItem('token')
    const { data } = await axios.get(
      `${url}/notes`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    store.dispatch('setNotes', data)

    return data
  }
}

export const addNew = async ({ title, content }) => {
  if (localStorage.getItem('token')) {
    const token = localStorage.getItem('token')
    const { data } = await axios.post(
      `${url}/notes`,
      { title, content },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    store.dispatch('setNewNote', data)
  }
}

export const deleteOne = async (id) => {
  if (localStorage.getItem('token')) {
    const token = localStorage.getItem('token')
    await axios.delete(
      `${url}/notes/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    store.dispatch('deleteNote', id)
  }
}
