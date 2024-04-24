'use client'

import { createTheme, ThemeProvider } from "@mui/material/styles"
import rtlPlugin from "stylis-plugin-rtl"
import { prefixer } from "stylis"
import { CacheProvider } from "@emotion/react"
import createCache from "@emotion/cache"

const theme = createTheme({
    palette: {
        mode: 'light'
    },
    typography: {
        fontFamily: 'Vazir',
    },
    components: {
        MuiTypography: {
            defaultProps: {
                variantMapping: {
                    h1: 'h2',
                    h2: 'h2',
                    h3: 'h2',
                    h4: 'h2',
                    h5: 'h2',
                    h6: 'h2',
                    subtitle1: 'h2',
                    subtitle2: 'h2',
                    body1: 'span',
                    body2: 'span',
                },
            },
        },
        MuiCssBaseline: {
            styleOverrides: `
            @font-face {
              font-family: 'Vazir';
              font-style: normal;
              font-display: swap;
              font-weight: 400;
              src: local('Vazir'), local('Vazir'), url(/fonts/Vazir.woff2) format('woff2');
              unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
            }
          `,
        },
    },
    direction: "rtl"
});
// Create rtl cache
const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin]
});

export default function ThemeDirection({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <CacheProvider value={cacheRtl} >
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </CacheProvider>
    )
}