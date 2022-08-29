import { ReactNode } from "react"
import styled from "styled-components"
import {
  BorderProps,
  ColorProps,
  FlexboxProps,
  LayoutProps,
  MarginProps,
  PaddingProps,
  SpaceProps,
  border,
  color,
  compose,
  flexbox,
  layout,
  margin,
  padding,
  space,
  system,
} from "styled-system"

interface ShortHand {
  b?: string
  br?: string | number
  h?: string | number
  w?: string | number
  maxH?: string | number
  maxW?: string | number
  minH?: string | number
  minW?: string | number
}

export interface BoxProps
  extends ColorProps,
    LayoutProps,
    SpaceProps,
    BorderProps,
    FlexboxProps,
    PaddingProps,
    MarginProps,
    ShortHand {
  children: ReactNode
}

const shortHand = system({
  b: {
    property: "background",
  },
  br: {
    property: "borderRadius",
  },
  h: {
    property: "height",
  },
  w: {
    property: "width",
  },
  maxH: {
    property: "maxHeight",
  },
  maxW: {
    property: "maxWidth",
  },
  minH: {
    property: "minHeight",
  },
  minW: {
    property: "minWidth",
  },
})

const styleProps = compose(
  color,
  layout,
  space,
  border,
  flexbox,
  padding,
  margin,
  shortHand,
)

export const Box: React.FC<BoxProps> = styled.div(
  { boxSizing: "border-box" },
  styleProps,
)
