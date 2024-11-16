import { useSearchStore } from "@/stores/search";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ListRenderItem,
  NativeSyntheticEvent,
  TextInput,
  TextInputChangeEventData,
  ViewProps,
  Text,
  TouchableOpacity,
  FlatList,
  View,
  TextInputProps,
} from "react-native";
import { useShallow } from "zustand/shallow";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useDebouncedCallback } from "use-debounce";

interface Props {
  onSearch?: (query: string) => void;
  containerProps?: ViewProps;
  inputProps?: TextInputProps;
  itemsVisible?: boolean;
}

export function TheQuery(props: Props) {
  const queryValue = useRef("");
  const rotation = useSharedValue(0);
  const [queryDisabled, setQueryDisabled] = useState(() => true);
  const selectedItems = useSearchStore(useShallow((state) => Object.keys(state.selectedItems)));
  const removeItem = useSearchStore((state) => state.removeItem);

  useEffect(() => {
    rotation.value = withTiming(props.itemsVisible ? 180 : 0);
  }, [props.itemsVisible]);

  const handleQueryChange = useCallback(
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
      queryValue.current = event.nativeEvent.text;

      if (queryValue.current && queryDisabled === true) {
        setQueryDisabled(false);
      } else if (!queryValue.current && queryDisabled === false) {
        setQueryDisabled(true);
      }
    },
    [queryDisabled]
  );

  const handleSearch = useCallback(() => {
    props.onSearch?.(queryValue.current);
  }, [props.onSearch]);

  const debouncedSearch = useDebouncedCallback(() => {
    handleSearch()
  }, 500)

  const arrowAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotateZ: `${rotation.value}deg`,
      },
    ],
  }));

  const renderItem: ListRenderItem<string> = ({ item }) => {
    return (
      <Animated.View className="flex-row items-center gap-4 bg-slate-300 px-2 py-2 rounded-xl">
        <Text>{useSearchStore.getState().selectedItems[item].name}</Text>
        <TouchableOpacity onPress={() => removeItem(item)} className="bg-slate-500 p-1 rounded">
          <Ionicons name="close" color="white" />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View className=" p-2 gap-2 rounded-2xl border border-slate-400" {...props.containerProps}>
      {selectedItems.length > 0 && (
        <FlatList
          data={selectedItems}
          renderItem={renderItem}
          keyExtractor={(item) => item}
          horizontal
          contentContainerClassName="gap-2"
          fadingEdgeLength={50}
        />
      )}

      <View className="flex-row items-center justify-between">
        <TextInput
          placeholder="Search something"
          onChange={(event) => {
            handleQueryChange(event)
            debouncedSearch()
          }}
          onSubmitEditing={handleSearch}
          multiline={false}
          returnKeyType="search"
          className="grow"
          {...props.inputProps}
        />

        <Animated.View style={arrowAnimatedStyle}>
          <Ionicons name="caret-down" color="#475569" size={18} />
        </Animated.View>
      </View>
    </View>
  );
}
