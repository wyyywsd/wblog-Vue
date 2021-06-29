const token = localStorage.getItem("token")
console.log(token !== null)
const state = () => {
  return {
    //登录弹窗的控制变量 
    loginDialogVisibleState: false,
    //注册的弹窗控制变量
    registerDialogVisibleState: false,
    //更新用户信息的弹窗控制变量
    UpdateUserDialogVisibleState: false,
    //判断是否登陆的控制变量
    isLoginState: token !== null
  }
}

const mutations = {
  setLoginDialogVisibleState(state, arg) {
    state.loginDialogVisibleState = arg
  },
  setRegisterDialogVisibleState(state, arg) {
    state.registerDialogVisibleState = arg
  },
  setUpdateUserDialogVisibleState(state, arg){
    state.UpdateUserDialogVisibleState = arg
  },
  setIsLoginState(state, arg) {
    state.isLoginState = arg
  }
}

const actions = {
  setActionLoginDialogVisibleState({ commit }, arg) {
    commit("setLoginDialogVisibleState", arg)
  },
  setActionRegisterDialogVisibleState({ commit }, arg) {
    commit("setRegisterDialogVisibleState", arg)
  },
  setActionUpdateUserDialogVisibleState({ commit }, arg){
    commit("setUpdateUserDialogVisibleState", arg)
  },
  setActionIsLoginState({ commit }, arg) {

    commit("setIsLoginState", arg)
  }
}

export default {
  namespaced: true,
  actions,
  state,
  mutations
}