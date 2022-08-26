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
  flexbox,
  layout,
  margin,
  padding,
  space,
} from "styled-system"

export interface BoxProps
  extends ColorProps,
    LayoutProps,
    SpaceProps,
    BorderProps,
    FlexboxProps,
    PaddingProps,
    MarginProps {
  children: ReactNode
}

export const Box: React.FC<BoxProps> = styled.div(
  { boxSizing: "border-box" },
  color,
  layout,
  space,
  border,
  flexbox,
  padding,
  margin,
)
