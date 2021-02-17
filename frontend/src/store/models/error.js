export const error = {
  name: 'error',
  state: {
    message: null,
  },
  reducers: {
    showError(state, payload) {
      return { message: payload };
    },
    closeError() {
      return { message: null };
    },
  },
};
