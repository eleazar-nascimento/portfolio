"use client";

import { Switch as NextUISwitch, SwitchProps } from "@nextui-org/react";
import { SunIcon } from "../icons/SunIcon";
import { MoonIcon } from "../icons/MoonIcon";

type SwitchTheme = SwitchProps  & {
  theme?: string
}

// NextUI's Switch exposes a polymorphic prop union that TypeScript cannot
// represent when props are spread (TS2590). Narrowing it to a plain function
// component keeps the exact same runtime behavior while avoiding the error.
const Switch = NextUISwitch as (props: SwitchProps) => JSX.Element

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