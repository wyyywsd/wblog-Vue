const state = () => {
  return {
    articleList: [],
    newArticleDialogVisibleState: false
  }
}

const mutations = {
  setAll(state, result) {
    state.articleList = result.articles
  },
  setNewArticleDialogVisibleState(state, arg) {
    state.newArticleDialogVisibleState = arg
  }
 
}
//注意 :异步操作放在action里 不要放在mutation里!
const actions = {
  loadData({ commit }) {
    fetch('/packge.json')
      .then(response => response.json())
      .then(result => {
        commit('setAll', result)
      })
  },
  setActionNewArticleDialogVisibleState({commit}, arg){
    commit("setNewArticleDialogVisibleState", arg)
  } 
 
}



export default {
  namespaced: true,
  actions,
  state,
  mutations
}