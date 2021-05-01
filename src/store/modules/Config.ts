export interface ConfigState {
  axiosLoading: boolean;
}

interface ConfigModule<S> {
  namespaced: true;
  state: S;
  getters: {
    axiosLoading: (state: S) => boolean;
  };
  mutations: {
    setLoading: (state: S, payload: boolean) => void;
  };
}

export const Config: ConfigModule<ConfigState> = {
  namespaced: true,
  state: {
    axiosLoading: false
  },
  getters: {
    axiosLoading: ({ axiosLoading }) => axiosLoading
  },
  mutations: {
    setLoading: (state, payload) => (state.axiosLoading = payload)
  }
};
