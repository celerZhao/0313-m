import * as types from '../types.js'

const state = {
  usercenter: {}
}

const getters = {
  usercenter: state => state.usercenter
}

const actions = {}

const mutations = {
  [types.USER_CENTER](state, data) {
    state.usercenter = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
