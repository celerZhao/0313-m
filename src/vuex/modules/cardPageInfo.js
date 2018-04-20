import * as types from '../types.js'


const state = {
  getCard: []
}

const actions = {
  setCardPageInfo({commit}, data) {
    commit(types.CARDPAGEINFO, data)
  }
}

const getters = {
  getCard: state => state.getCard
}

const mutations = {
  [types.CARDPAGEINFO](state, res) {
    state.getCard = res;
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
