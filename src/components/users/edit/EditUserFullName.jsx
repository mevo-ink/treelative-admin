import React from 'react'

import EditableInputDialog from 'components/_input/EditableInputDialog'

import { string } from 'yup'

import { useMutation } from 'urql'
import { UPDATE_USER_FULL_NAME } from 'graphql/mutations/users'

export default function EditUserFullName ({ user, inline = false, ...props }) {
  const [{ error, fetching }, updateUserFullName] = useMutation(UPDATE_USER_FULL_NAME)

  const handleSubmit = fullName => {
    const variables = { userID: user.id, input: { fullName } }
    return updateUserFullName(variables)
  }

  return (
    <EditableInputDialog
      inline={inline}
      title='Edit Full Name'
      subTitle={user.fullName}
      name='fullName'
      value={user.fullName || ''}
      onSubmit={handleSubmit}
      validation={string().required()}
      loading={fetching}
      error={error}
      notification='Successfully updated the full name'
      {...props}
    />
  )
}
