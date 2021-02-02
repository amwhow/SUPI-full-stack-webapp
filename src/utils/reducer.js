export default function reducer(state, action) {
  switch(action.type) {
    case 'setuser_name': {
      return {
        ...state,
        user_name: action.data
      }
    }
    case 'setemail': {
      return {
        ...state,
        email: action.data
      }
    }
    case 'setpassword': {
      return {
        ...state,
        password: action.data
      }
    }
    case 'setpassword_confirmation': {
      return {
        ...state,
        password_confirmation: action.data
      }
    }
    case 'setcompany_name': {
      return {
        ...state,
        company_name: action.data
      }
    }
    case 'setlogo': {
      return {
        ...state,
        logo: action.data
      }
    }
    default: return state
  }
}