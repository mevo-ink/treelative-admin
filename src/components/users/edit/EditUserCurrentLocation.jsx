import React from 'react'

import EditableLocationDialog from 'components/_input/EditableLocationDialog'

import { useMutation } from 'urql'
import { UPDATE_USER_CURRENT_LOCATION } from 'graphql/mutations/users'

export default function EditUserCurrentLocation ({ user, inline = false, ...props }) {
  const [{ error, fetching }, updateUserCurrentLocation] = useMutation(UPDATE_USER_CURRENT_LOCATION)

  const handleSubmit = currentLocation => {
    const variables = { userID: user.id, input: { currentLocation } }
    return updateUserCurrentLocation(variables)
  }

  return (
    <EditableLocationDialog
      inline={inline}
      title='Edit Current Location'
      subTitle={user.fullName}
      value={user.currentLocation || ''}
      onSubmit={handleSubmit}
      loading={fetching}
      error={error}
      notification='Successfully updated the current location'
      {...props}
    />
  )
}
