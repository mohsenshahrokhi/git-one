"use client";
import { ThemeProvider } from 'next-themes'
import { FC, PropsWithChildren } from "react";

const ThemeProviders: FC<PropsWithChildren> = function ({ children }) {

    return <ThemeProvider enableSystem={true} attribute="class">{children}</ThemeProvider>;
};

export default ThemeProviders;
