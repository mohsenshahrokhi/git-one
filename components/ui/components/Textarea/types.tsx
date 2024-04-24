import { InputHTMLAttributes, ReactNode, RefObject, Ref, ComponentProps } from "react";

interface InputTheme {
  wrapper?: string;
  input?: string;
  activeInput?: string;
  label?: string;
  activeLabel?: string;
  notch?: string;
  notchLeading?: string;
  activeNotchLeading?: string;
  focusedNotchLeading?: string;
  notchLeadingDefault?: string;
  focusedNotchLeadingDefault?: string;
  notchLeadingWhite?: string;
  focusedNotchLeadingWhite?: string;
  notchMiddle?: string;
  activeNotchMiddle?: string;
  focusedNotchMiddle?: string;
  notchMiddleDefault?: string;
  focusedNotchMiddleDefault?: string;
  notchMiddleWhite?: string;
  focusedNotchMiddleWhite?: string;
  notchTrailing?: string;
  activeNotchTrailing?: string;
  focusedNotchTrailing?: string;
  notchTrailingDefault?: string;
  focusedNotchTrailingDefault?: string;
  notchTrailingWhite?: string;
  focusedNotchTrailingWhite?: string;
  counter?: string;
  inputSizeLg?: string;
  inputSizeBase?: string;
  inputSizeSm?: string;
  labelSizeLg?: string;
  activeLabelSizeLg?: string;
  labelSizeBase?: string;
  activeLabelSizeBase?: string;
  labelSizeSm?: string;
  activeLabelSizeSm?: string;
}

type InputELement = Omit<InputHTMLAttributes<HTMLInputElement>, "size">;

export type InputProps = InputELement & {
  label?: ReactNode;
  labelRef?: RefObject<HTMLLabelElement>;
  ref?: Ref<HTMLInputElement>;
  readonly?: boolean;
  disabled?: boolean;
  size?: string;
  wrapperTag?: ComponentProps<any>;
  theme?: InputTheme;
  formWhite?: boolean;
  counter?: boolean;
  maxLength?: number;
  value?: string
};

// export type { InputProps };
