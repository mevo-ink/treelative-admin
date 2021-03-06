import React from 'react'

import EditableLocationDialog from 'components/_input/EditableLocationDialog'

import { useMutation } from 'urql'
import { UPDATE_COUPLE_MARRIAGE_LOCATION } from 'graphql/mutations/couples'

import {
  FormLabel,
  FormControl
} from '@chakra-ui/form-control'

export default function EditCoupleMarriageLocation ({ couple, inline = false, ...props }) {
  const [{ error, fetching }, updateCoupleMarriageLocation] = useMutation(UPDATE_COUPLE_MARRIAGE_LOCATION)

  const handleSubmit = marriageLocation => {
    const variables = { coupleID: couple.id, input: { marriageLocation } }
    return updateCoupleMarriageLocation(variables)
  }

  return (
    <FormControl>
      <FormLabel>Marriage Location</FormLabel>
      <EditableLocationDialog
        inline={inline}
        title='Edit Marriage Location'
        value={couple.marriageLocation || ''}
        onSubmit={handleSubmit}
        loading={fetching}
        error={error}
        notification='Successfully updated the marriage location'
        {...props}
      />
    </FormControl>
  )
}
