// import axios from 'axios'
const axios = require('axios')
// import CryptoJS from 'crypto-js'
const CryptoJS = require('crypto-js')

const apiClient = axios.create({
  baseURL: 'https://api.github.com/',
  withCredentials: false,
  timeout: 5000,
})

const authToken = () => {
  let decrypted = undefined
  const encryptedToken = process.env.VUE_APP_ENCRYPTED_GITHUB_TOKEN
  if (encryptedToken) {
    const bytes = CryptoJS.AES.decrypt(encryptedToken, 'public-key')
    decrypted = bytes.toString(CryptoJS.enc.Utf8)
  }
  return decrypted
}

const authConfig = () => {
  const token = authToken()
  let config = {}
  if (token) {
    config.headers = { Authorization: 'token ' + token }
  }
  return config
}

const contributors = async (org, repo) => {
  const config = authConfig()
  const response = await apiClient.get(
    `repos/${org}/${repo}/contributors`,
    config,
  )
  return response.data
}

const user = async login => {
  const config = authConfig()
  const response = await apiClient.get(`users/${login}`, config)
  return response.data
}

const rateLimit = async () => {
  const response = await apiClient.get('rate_limit')
  return response.data
}

// export default {
//   user,
//   contributors,
//   rateLimit,
// }

module.exports = {
  rateLimit,
  contributors,
  user,
}
