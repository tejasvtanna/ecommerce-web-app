import api from './api'
import { urlConst } from '../utilities/constants'

export const userService = {
  getUserDetails,
  addNewUser,
  updateUser,
}

function getUserDetails(userId: any) {
  return api.get(urlConst.USERS + `/${userId}`)
}

function addNewUser(user: any) {
  return api.post(urlConst.USERS, user)
}

function updateUser(updatedUser: any) {
  return api.put(urlConst.USERS + `\\${updatedUser.id}`, updatedUser)
}
