import api from '../../services/api';

export const auth = {
  name: 'auth',
  state: {
    user: null,
    signed: false,
  },
  reducers: {
    setUser(state, payload) {
      return { user: payload, signed: true };
    },
    logout() {
      return { user: null, signed: false };
    },
  },
  effects: dispatch => ({
    async handleLogin(payload) {
      try {
        const response = await api.post(payload.request, payload.body);
        dispatch.auth.setUser(response.data);
        return response.status;
      } catch (error) {
        const { response } = error;
        dispatch.error.showError(response.data.message);
        return response.status;
      }
    },
  }),
};
