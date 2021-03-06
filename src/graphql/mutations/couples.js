import { gql } from 'urql'

export const ADD_COUPLE = gql`
  mutation ADD_COUPLE ($input: AddCoupleInput!) {
    addCouple(input: $input) {
      id
      userOne {
        id
      }
      userTwo {
        id
      }
    }
  }
`

export const DELETE_COUPLE = gql`
  mutation DELETE_COUPLE ($coupleID: String!) {
    deleteCouple(coupleID: $coupleID) {
      id
      userOne {
        id
        couple {
          id
        }
      }
      userTwo {
        id
        couple {
          id
        }
      }
    }
  }
`

export const UPDATE_COUPLE_DATE_OF_MARRIAGE = gql`
  mutation UPDATE_COUPLE_DATE_OF_MARRIAGE ($coupleID: String! $input: UpdateCoupleInput!) {
    updateCouple(coupleID: $coupleID input: $input) {
      id
      userOne {
        id
        couple {
          id
          dateOfMarriage
        }
      }
      userTwo {
        id
        couple {
          id
          dateOfMarriage
        }
      }
    }
  }
`

export const UPDATE_COUPLE_MARRIAGE_LOCATION = gql`
  mutation UPDATE_COUPLE_MARRIAGE_LOCATION ($coupleID: String! $input: UpdateCoupleInput!) {
    updateCouple(coupleID: $coupleID input: $input) {
      id
      userOne {
        id
        couple {
          id
          marriageLocation
        }
      }
      userTwo {
        id
        couple {
          id
          marriageLocation
        }
      }
    }
  }
`
