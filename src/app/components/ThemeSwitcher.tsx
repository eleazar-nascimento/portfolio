// app/components/ThemeSwitcher.tsx
"use client";

import {useTheme} from "next-themes";
import { useEffect, useState } from "react";
import { SwitchTheme } from "./Switch";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted) return null

  return (
    <div>
      The current theme is: {theme}
      <SwitchTheme
        theme={theme}
        onValueChange={(isSelected: boolean) => {
          if(isSelected === true) setTheme('light')
          if(isSelected === false) setTheme('dark')
        }}
      />
      {/* <button onClick={() => setTheme('light')}>Light Mode</button>
      <button onClick={() => setTheme('dark')}>Dark Mode</button> */}
    </div>
  )
};