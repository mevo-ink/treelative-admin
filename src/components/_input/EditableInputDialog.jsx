import React, { useState, useEffect } from 'react'

import useDevice from 'hooks/useDevice'

import {
  Text,
  Stack,
  Input,
  Textarea,
  IconButton,
  InputGroup,
  FormControl,
  useDisclosure,
  InputLeftAddon,
  createStandaloneToast
} from '@chakra-ui/react'

import { BiEdit } from 'react-icons/bi'

import FormDialog from 'components/_common/FormDialog'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { object } from 'yup'

const toast = createStandaloneToast()

export default function InputDialogTrigger (props) {
  const {
    reset,
    initiallyOpen = false,
    isDisabled = false,
    inline = false,
    justifyContent = 'left',
    onClose: onParentClose,
    ...inputProps
  } = props

  const { isTouch } = useDevice()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [isVisible, setIsVisible] = useState(inline)

  const marginOffset = isVisible && justifyContent === 'center' ? '8' : ''

  const touchDeviceProps = isTouch ? { onClick: onOpen, cursor: 'pointer' } : {}

  if (initiallyOpen) return <InputDialog {...inputProps} onClose={onParentClose} />

  return (
    <>
      {isOpen && <InputDialog {...inputProps} onClose={onClose} />}
      <Stack
        direction='row'
        alignItems='center'
        width='100%'
        onMouseEnter={!inline ? () => setIsVisible(true) : null}
        onMouseLeave={!inline ? () => setIsVisible(false) : null}
        justifyContent={justifyContent}
      >
        <Text
          fontSize={inline ? 'md' : 'sm'}
          overflowX='hidden'
          ml={marginOffset}
          {...touchDeviceProps}
        >
          {inputProps.value || '-'}
        </Text>
        {isVisible && (
          <IconButton
            size={inline ? 'sm' : 'xs'}
            variant='outline'
            icon={<BiEdit fontSize='16px' />}
            onClick={onOpen}
            isDisabled={isDisabled}
          />
        )}
      </Stack>
    </>
  )
}

function InputDialog (props) {
  const {
    onClose,
    type = 'text',
    name = 'inputFieldName',
    value = '',
    title = '',
    placeholder = 'Type here ...',
    onSubmit = console.log,
    validation,
    loading,
    error,
    rows = 10,
    notification = '',
    leftAddon
  } = props

  const InputElement = type === 'textarea' ? Textarea : Input

  const schemaValidation = object().shape({
    [name]: validation
  })

  const onCancel = () => {
    reset()
    onClose()
  }

  const { handleSubmit, formState: { errors }, register, reset, setFocus } = useForm({
    defaultValues: { [name]: value },
    resolver: yupResolver(schemaValidation)
  })

  useEffect(() => { setTimeout(() => setFocus(name), 1) }, [])

  const handleOnSubmit = (form) => {
    const submitData = type !== 'number' ? form[name].trim() : parseInt(form[name])
    onSubmit(submitData)
      .then(result => {
        if (result.data) {
          if (notification) {
            toast({
              title: notification,
              status: 'success',
              position: 'top',
              duration: 3000,
              isClosable: true
            })
          }
          onClose()
        }
      })
      .catch(console.log)
  }

  return (
    <FormDialog
      closeOnOverlayClick
      title={title}
      submitLabel='Submit'
      error={error || errors[name]}
      loading={loading}
      onClose={onCancel}
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      <FormControl isInvalid={errors[name] || Boolean(error)}>
        <InputGroup>
          {leftAddon && <InputLeftAddon> {leftAddon} </InputLeftAddon>}
          <InputElement
            {...register(name)}
            type={type}
            placeholder={placeholder}
            rows={rows}
          />
        </InputGroup>

      </FormControl>
    </FormDialog>
  )
}