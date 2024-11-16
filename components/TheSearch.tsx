import { getCharacters } from "@/api/getCharacters";
import { TheQueryInput } from "@/components/TheQueryInput";

import { useSearchStore } from "@/stores/search";
import { useMutation } from "@tanstack/react-query";
import { useVisible } from "@/hooks/useVisible";
import { Character } from "@/types/character";
import { useCallback } from "react";
import { ActivityIndicator, ListRenderItem, View } from "react-native";
import Animated, {
  FadeInDown,
  FadeOutUp,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useShallow } from "zustand/shallow";
import { TheQuery } from "./TheQuery";
import { BaseText } from "./base/BaseText";

export default function TheSearch() {
  const setQuery = useSearchStore(useShallow((state) => state.setQuery));
  const queryHeight = useSharedValue(0);
  const { visible, setVisible } = useVisible();


  const mutation = useMutation({
    mutationKey: ["characters"],
    mutationFn: getCharacters,
  });

  const handleSearch = useCallback((query: string) => {
    setQuery(query);
    mutation.mutate(query);
  }, []);

  const renderItem: ListRenderItem<Character> = useCallback(
    ({ item }) => <TheQueryInput item={item} />,
    []
  );

  const emptyComponent = useCallback(() => {
    return (
      <View className="h-full items-center justify-center">
        {mutation.data ? (
          <BaseText tint>No results found for {mutation.variables}</BaseText>
        ) : mutation.isPending ? (
          <ActivityIndicator />
        ) : (
          <BaseText tint>Search something</BaseText>
        )}
      </View>
    );
  }, [mutation.data, mutation.isPending]);

  const itemSeperatorComponent = useCallback(() => {
    return <View className="w-full h-[1px] bg-slate-400" />;
  }, []);

  const listAnimatedStyle = useAnimatedStyle(() => {
    return {
      top: withTiming(queryHeight.value + 8),
    };
  });

  return (
    <View className="relative m-4">
      <TheQuery
        onSearch={handleSearch}
        itemsVisible={visible}
        containerProps={{
          onLayout: (event) => {
            queryHeight.value = event.nativeEvent.layout.height;
          },
        }}
        inputProps={{
          onFocus: () => {
            setVisible(true);
          },
          onPress: () => {
            setVisible(true);
          },
        }}
      />

      {visible && (
        <Animated.View
          entering={FadeInDown}
          exiting={FadeOutUp}
          className="absolute left-0 right-0 z-50 rounded-2xl border border-slate-400 overflow-hidden"
          style={listAnimatedStyle}
        >
          <Animated.FlatList
            layout={LinearTransition}
            data={mutation.data?.results || []}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={emptyComponent}
            ItemSeparatorComponent={itemSeperatorComponent}
            className="rounded-xl overflow-hidden bg-slate-50 z-50 h-56"
          />
        </Animated.View>
      )}
    </View>
  );
}
