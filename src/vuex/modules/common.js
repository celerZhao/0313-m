import api from '../../fetch/ajax.js'
import * as types from '../types.js'
  // console.log(loadFavorite());
const state = {
  login: false,
  token: '',
  imgCode: '',
  findPayPwd: '',
  eye: true,
  phone: '',
  payPassword: false,
  showMoney: false
}
const actions = {
  setPayFlag({commit}, pay) {
    commit(types.PAY_PASSWORD, saveFavorite(pay))
  },
  showMoney({commit, state}, {flag, value}) {
    let phone = state.phone.slice()
    commit(types.SHOW_MONEY, saveToLocal(phone, flag, value))
  }
}

const getters = {
  findPayPwd: state => {
    if(!state.findPayPwd) {
      state.findPayPwd = window.sessionStorage.getItem('findPayPwd')
    }
    return state.findPayPwd
  },
  eye: state => {
    if(window.sessionStorage.getItem('eye')) {
      state.eye = window.sessionStorage.getItem('eye')
    }
    state.eye = window.sessionStorage.getItem('eye')
    return state.eye
  },
  imgCode: state => state.imgCode,
  token: state => state.token,
  payPassword: state => state.payPassword,
  showMoney: state => state.showMoney,
  phone: state => {
    if(!state.phone) {
      state.phone = window.sessionStorage.getItem('phone')
    }
    return state.phone
  }
}

const mutations = {
  [types.LOGIN](state, res) {
    state.login = res
  },
  [types.TOKEN](state, res) {
    window.sessionStorage.setItem('token', res)
    // state.token = window.sessionStorage.getItem('token')
    state.token = res
  },
  [types.IMGCODE](state, res) {
    state.imgCode = res
  },
  [types.FIND_PAY_PAW](state, res) {
    state.findPayPwd = res
    window.sessionStorage.setItem('findPayPwd',state.findPayPwd)
  },
  [types.EYE](state, res) {
    state.eye = res
    window.sessionStorage.setItem('eye',state.eye)
  },
  [types.PHONE](state, res) {
    state.phone = res
    window.sessionStorage.setItem('phone',state.phone)
  },
  [types.SHOW_MONEY](state, res) {
    state.showMoney = res
  },
  [types.PAY_PASSWORD](state, res) {
    state.payPassword = res
    //window.sessionStorage.setItem('payPassword', state.payPassword)
  }
}


export default {
  state,
  getters,
  actions,
  mutations
}
