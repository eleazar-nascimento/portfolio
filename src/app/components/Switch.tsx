"use client";

import { Switch, SwitchProps } from "@nextui-org/react";
import { SunIcon } from "../icons/SunIcon";
import { MoonIcon } from "../icons/MoonIcon";

type SwitchTheme = SwitchProps  & {
  theme?: string
}

export function SwitchTheme({ theme,...props }: SwitchTheme) {
    return(
      <Switch
        {...props}
        size="md"
        color="danger"
        thumbIcon={({ isSelected, className }) =>
          isSelected ? (
            <SunIcon className={className} />
          ) : (
            <MoonIcon className={className} />
          )
        }
      >
      {theme} mode
    </Switch>
    )
}