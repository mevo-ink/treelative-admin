import React from 'react'

import { useMutation } from 'urql'
import { UPDATE_USER_DATE_OF_BIRTH } from 'graphql/mutations/users'

import DateTimePicker from 'components/_input/DateTimePicker'

export default function EditUserDateOfBirth ({ user, inline = false }) {
  const [{ error, fetching }, updateUserDateOfBirth] = useMutation(UPDATE_USER_DATE_OF_BIRTH)

  const handleSubmit = dateOfBirth => {
    const variables = { userID: user.id, input: { dateOfBirth } }
    return updateUserDateOfBirth(variables)
  }

  return (
    <DateTimePicker
      inline={inline}
      type='date'
      label='Edit Date of Birth'
      value={user.dateOfBirth}
      onChange={handleSubmit}
      error={error}
      loading={fetching}
    />
  )
}