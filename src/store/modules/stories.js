import axiosInstance from "@/plugins/axios";

const state = {
  isLoadingStories: false,
  storiesData: null,
  filterData: null,
};

const getters = {
  isLoadingStories: (state) => state.isLoadingStories,
  storiesData: (state) => state.storiesData,
  filterData: (state) => state.filterData,
};

const mutations = {
  GET_STORIES_PROCESS: (state, data) => {
    state.isLoadingStories = data;
  },
  GET_STORIES_SUCCESS: (state, data) => {
    state.storiesData = data;
  },
  SET_FILTER_DATA: (state, data) => {
    state.filterData = data;
  },
  LOAD_MORE_STORIES_SUCCESS: (state, data) => {
    state.storiesData.next_page_token = data.next_page_token;
    state.storiesData.stories.push(...data.stories);
  },
};

const actions = {
  getStories({ commit }, payload) {
    commit("SET_FILTER_DATA", payload);
    commit("GET_STORIES_PROCESS", true);
    axiosInstance
      .get("stories", { params: payload })
      .then(({ data }) => {
        console.log(!payload.page_token);
        if (!payload.page_token) {
          commit("GET_STORIES_SUCCESS", data);
        } else commit("LOAD_MORE_STORIES_SUCCESS", data);
      })
      .finally(() => {
        commit("GET_STORIES_PROCESS", false);
      });
  },
};

export default {
  namespaced: true,
  actions,
  mutations,
  getters,
  state,
};
// https://cf-endpoint-proxy.herokuapp.com/webapi/v1/stories
