import React, { useRef } from 'react'
import PT from 'prop-types'

import find from 'lodash/find'

import { ViewPropTypes, StyledPropTypes } from 'constants/propTypes'

import {
  Container,
  FieldLabel,
  FieldBottom,
  Picker,
  PickerContent,
  PickerArrow,
  PickerArrowIcon,
  PickerBody,
  PickerValue,
  PickerValueMissing,
  Sheet,
} from './styles'

export const Dropdown = ({
  options,
  value,
  error,
  placeholder,
  variant,
  isDisabled,
  label,
  title,
  isErrorMessageHidden,
  ...props
}) => {
  const sheetRef = useRef()

  const getSelectedOption = () => {
    if (!value) {
      return null
    }

    return find(options, { value })
  }

  const handlePickerPress = () => {
    sheetRef.current.show()
  }

  const renderPickerValue = () => {
    if (!value && !placeholder) {
      return <PickerValueMissing />
    }

    const selectedOption = getSelectedOption()
    const isPlaceholder = !selectedOption
    const shownValue = selectedOption ? selectedOption.label : placeholder

    return (
      <PickerBody>
        <PickerValue {...{ isPlaceholder }}>{shownValue}</PickerValue>
      </PickerBody>
    )
  }

  const renderPicker = () => {
    const hasError = !!error

    return (
      <Picker {...{ isDisabled }} onPress={handlePickerPress}>
        <PickerContent {...{ hasError }}>
          {renderPickerValue()}

          <PickerArrow>
            <PickerArrowIcon {...{ hasError, variant }} />
          </PickerArrow>
        </PickerContent>
      </Picker>
    )
  }

  return (
    <Container {...props}>
      <FieldLabel {...{ label }} />

      {renderPicker()}

      <Sheet
        {...props}
        ref={sheetRef}
        title={title || label}
        options={options}
        selectedOption={getSelectedOption()}
      />

      <FieldBottom {...{ error, isErrorMessageHidden }} />
    </Container>
  )
}

Dropdown.propTypes = {
  error: PT.oneOfType([PT.array, PT.string]),
  isDisabled: PT.bool,
  isErrorMessageHidden: PT.bool,
  label: PT.string,
  options: PT.array,
  placeholder: PT.string,
  style: ViewPropTypes.style,
  title: PT.string,
  value: PT.string,
  variant: StyledPropTypes.variant,
}

Dropdown.defaultProps = {
  error: null,
  isDisabled: false,
  isErrorMessageHidden: false,
  label: null,
  options: [],
  placeholder: null,
  style: {},
  title: null,
  value: '',
  variant: 'primary',
}
