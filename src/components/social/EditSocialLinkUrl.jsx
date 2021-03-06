import React from 'react'

import EditableInputDialog from 'components/_input/EditableInputDialog'

import { string } from 'yup'

import { useMutation } from 'urql'
import { UPDATE_SOCIAL_LINK_URL } from 'graphql/mutations/socialLinks'

export default function EditSocialLinkUrl ({ socialLink, inline = false, ...props }) {
  const [{ error, fetching }, updateSocialLinkUrl] = useMutation(UPDATE_SOCIAL_LINK_URL)

  const handleSubmit = url => {
    const variables = { socialLinkID: socialLink.id, input: { url } }
    return updateSocialLinkUrl(variables)
  }

  return (
    <EditableInputDialog
      inline={inline}
      title='Edit Url'
      type='link'
      subTitle={socialLink.fullName}
      name='url'
      value={socialLink.url || ''}
      onSubmit={handleSubmit}
      validation={string().url().required()}
      loading={fetching}
      error={error}
      notification='Successfully updated the url'
      {...props}
    />
  )
}
