import { TextProps, Text } from "react-native";

interface Props extends TextProps {
  tint?: boolean
}

export function BaseText({ className, tint, ...props }: Props) {
  return <Text className={`${tint ? 'text-slate-400' : 'text-slate-600'} ${className}`} {...props}>{props.children}</Text>
}
