import { ComponentProps } from "react"
import styled from "styled-components"
import {
  BorderProps,
  ColorProps,
  FlexboxProps,
  LayoutProps,
  SpaceProps,
  border,
  color,
  flexbox,
  layout,
  space,
} from "styled-system"

export type BoxProps = ComponentProps<"div"> &
  ColorProps &
  LayoutProps &
  SpaceProps &
  BorderProps &
  FlexboxProps

export const Box = styled.div<BoxProps>(
  { boxSizing: "border-box" },
  color,
  layout,
  space,
  border,
  flexbox,
)
