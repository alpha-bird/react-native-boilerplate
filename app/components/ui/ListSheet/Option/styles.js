import styled from 'styled-components/native'

import { Box } from 'components/ui/Box'
import { Text } from 'components/ui/Text'

export const Touchable = styled.TouchableOpacity``

export const Container = styled(Box).attrs((props) => {
  return {
    px: 5,
    bg: props.isSelected ? 'persimmon100' : 'night100',
    shadow: props.isSelected ? 'button' : 'none',
  }
})`
  flex-direction: row;
  align-items: center;
`

export const Label = styled(Text).attrs((props) => {
  return {
    color: props.isSelected ? 'white' : 'gray100',
  }
})``
