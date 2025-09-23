const API_BASE_URL = import.meta.env.PROD 
  ? 'http://23.22.136.44:5005/api'
  : 'http://localhost:5005/api'

export { API_BASE_URL }