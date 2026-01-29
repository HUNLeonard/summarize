import defaultTheme from 'tailwindcss/defaultTheme'

const pixelsPerRem = 16

export const xsScreenWidth = 420
export const smScreenWidth = parseInt(defaultTheme.screens.sm) * pixelsPerRem
export const mdScreenWidth = parseInt(defaultTheme.screens.md) * pixelsPerRem
export const lgScreenWidth = parseInt(defaultTheme.screens.lg) * pixelsPerRem
