import * as types from '../types.js'


const state = {
  getNew: []
}

const actions = {
  getNewDatel({commit}, data) {
    commit(types.GET_NEW_DETAL, data)
  }
}

const getters = {
  getNew: state => state.getNew
}

const mutations = {
  [types.GET_NEW_DETAL](state, res) {
    state.getNew = res;
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
