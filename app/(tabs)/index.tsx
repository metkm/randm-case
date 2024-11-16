import {
  Text,
  StyleProp,
  ViewStyle,
} from "react-native";
import Animated, {
  LinearTransition,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TheSearch from "@/components/TheSearch";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  const extraPadding = 4;
  const paddings: StyleProp<ViewStyle> = {
    paddingTop: insets.top + extraPadding,
    paddingBottom: insets.bottom + extraPadding,
    paddingLeft: insets.left + extraPadding,
    paddingRight: insets.right + extraPadding,
  };

  return (
    <Animated.View layout={LinearTransition} style={paddings} className="flex-1">
      <TheSearch />
      <Text className="text-center">Some other content</Text>
    </Animated.View>
  );
}
