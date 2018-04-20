import api from '../../fetch/ajax.js'
import * as types from '../types.js'

const state = {
  user: ''
}

const actions = {
  userIdx({commit}, data) {
    api.userIndex(data)
    .then(res => {
      commit(types.USDER_INDEX, res);
    }).catch(err => {
      console.log(err);
    })
  }
}

const getters = {
  userIdx: state => state.user
}

const mutations = {
  [types.USDER_INDEX](state, res) {
    state.user = res.data
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
