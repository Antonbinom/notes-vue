import axios from 'axios'
import store from '@/store/index.js'

const url = process.env.VUE_APP_API_URL

export const registration = async (data) => {
  await axios.post(`${url}/reg`, data)
  login({ email: data.email, password: data.password })
}

export const auth = async () => {
  if (localStorage.getItem('token')) {
    const token = localStorage.getItem('token')
    const { data } = await axios.get(
      `${url}/auth`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    store.dispatch('setAuthUser', { email: data.email })

    return data
  }
}

export const login = async (data) => {
  const res = await axios.post(`${url}/auth`, { email: data.email, password: data.password })
  const token = res.data.accessToken
  localStorage.setItem('token', token)

  auth()
}

export const logout = () => {
  localStorage.removeItem('token')
  store.dispatch('setAuthUser', {})
  store.dispatch('setNotes', [])
}
