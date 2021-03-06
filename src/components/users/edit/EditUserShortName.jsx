import React from 'react'

import EditableInputDialog from 'components/_input/EditableInputDialog'

import { string } from 'yup'

import { useMutation } from 'urql'
import { UPDATE_USER_SHORT_NAME } from 'graphql/mutations/users'

export default function EditUserShortName ({ user, inline = false, ...props }) {
  const [{ error, fetching }, updateUserShortName] = useMutation(UPDATE_USER_SHORT_NAME)

  const handleSubmit = shortName => {
    const variables = { userID: user.id, input: { shortName } }
    return updateUserShortName(variables)
  }

  return (
    <EditableInputDialog
      inline={inline}
      title='Edit Short Name'
      subTitle={user.shortName}
      name='shortName'
      value={user.shortName || ''}
      onSubmit={handleSubmit}
      validation={string().required()}
      loading={fetching}
      error={error}
      notification='Successshorty updated the short name'
      {...props}
    />
  )
}
