import axios from 'axios'
import { urlConst } from 'utilities/constants'

const defaultHeaders = {
  'Content-Type': 'application/json',
}

const api = axios.create({
  headers: defaultHeaders,
  baseURL: urlConst.API_BASE_URL,
  timeout: 30000,
})

// function getAuthToken() {
//   const state = store.getState();
//   const token = state.authReducer.token;
//   return token;
// }

// api.interceptors.request.use(
//   async (config) => {
//     try {
//       const appVersion = DeviceInfo.getVersion();
//       const deviceOS = Platform.OS === 'ios' ? 'iOS' : 'android';
//       const deviceOSVersion = DeviceInfo.getSystemVersion();
//       const token = getAuthToken();
//       config.headers['X-APP-VERSION'] = appVersion;
//       config.headers['X-DEVICE-OS'] = deviceOS;
//       config.headers['X-DEVICE-OS-VERSION'] = deviceOSVersion;
//       if (token !== null) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//     } catch (e) {
//       console.log('ERRORR', e)
//     }
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   }
// )

export default api
