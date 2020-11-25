import styled from 'styled-components/native'

import { Box } from 'components/ui'

import { getBottomSpace as getBottomSpaceMethod } from 'components/ui/ListSheet/styles'

export const getBottomSpace = getBottomSpaceMethod

export {
  getMaxHeight,
  Container,
  Overlay,
  OverlayBackground,
  Body,
  Header,
  HeaderHandle,
  HeaderButton,
  HeaderTitle,
  Meta,
} from 'components/ui/ListSheet/styles'

export { DateRange } from './DateRange'

export { TimeRange } from './TimeRange'

export const Content = styled(Box).attrs({
  px: 5,
  py: 7,
  height: 220,
})`
  padding-bottom: ${(props) => {
    return getBottomSpaceMethod(props, false)
  }}px;
`
