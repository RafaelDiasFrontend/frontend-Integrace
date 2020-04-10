export const getters = {
  authenticated (state) {
    return state.loggedIn
  },
  user (state) {
    return state.user
  },
  logincount (state) {
    return state.logincount
  },
  ability (state) {
    return state.ability
  },
  email (state) {
    return state.email
  },
  name (state) {
    return state.name
  },
  birthday (state) {
    return state.birthday
  },
  slug (state) {
    return state.slug
  },
  crea (state) {
    return state.crea
  }
}