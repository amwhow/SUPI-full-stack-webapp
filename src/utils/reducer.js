export default function reducer(state, action) {
  switch(action.type) {
    // USER CASES
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
    // PO CASES
    case 'setorderDate': {
      return {
        ...state,
        orderDate: action.data
      }
    }
    case 'setapprovalStatus': {
      return {
        ...state,
        approvalStatus: action.data
      }
    }
    case 'settotalPrice': {
      return {
        ...state,
        approvalStatus: action.data
      }
    }
    case 'setdelivered': {
      return {
        ...state,
        delivered: action.data
      }
    }
    case 'setsupplierId': {
      return {
        ...state,
        supplierId: action.data
      }
    }
    // Need to add file state here
    // INVOICE CASES
    case 'setreceivedDate': {
      return {
        ...state,
        receivedDate: action.data
      }
    }
    case 'setdueDate': {
      return {
        ...state,
        dueDate: action.data
      }
    }
    case 'settotalPrice': {
      return {
        ...state,
        totalPrice: action.data
      }
    }
    case 'setpaid': {
      return {
        ...state,
        paid: action.data
      }
    }
    case 'setpurchaseOrderId': {
      return {
        ...state,
        purchaseOrderId: action.data
      }
    }
    // Need to add file state here
    // REVIEW CASES
    case 'setpurchaseOrderId': {
      return {
        ...state,
        purchaseOrderId: action.data
      }
    }
    case 'setqualityRating': {
      return {
        ...state,
        qualityRating: action.data
      }
    }
    case 'setreliabilityRating': {
      return {
        ...state,
        reliabilityRating: action.data
      }
    }
    case 'setcostRating': {
      return {
        ...state,
        costRating: action.data
      }
    }
    case 'setcomment': {
      return {
        ...state,
        comment: action.data
      }
    }
    default: return state
  }
}