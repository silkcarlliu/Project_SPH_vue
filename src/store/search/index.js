import { reqGetSearchInfo } from "@/api"
const state = {
  searchList: {}
}

const mutations = {
  SEARCHLIST(state,searchList) {
    state.searchList = searchList
  }
}

const actions = {
  async getSearchList({commit}, params={}){
    let res = await reqGetSearchInfo(params)
    if (res.code === 200) {
      commit("SEARCHLIST",res.data)
    }
  }
}

const getters = {
  goodList: (state) => state.searchList.goodsList || [],
  attrsList: (state) => state.searchList.attrsList || [],
  trademarkList: (state) => state.searchList.trademarkList || []
}

export default {
  state,
  mutations,
  actions,
  getters
}