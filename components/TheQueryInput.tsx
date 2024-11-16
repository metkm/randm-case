import { useSearchStore } from "@/stores/search";
import { Character } from "@/types/character";
import { Ionicons } from "@expo/vector-icons";
import { useCallback } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { useShallow } from "zustand/shallow";
import { BaseText } from "./base/BaseText";

interface Props {
  item: Character;
}

export function TheQueryInput(props: Props) {
  const query = useSearchStore((state) => state.query);
  const isSelected = useSearchStore(useShallow((state) => state.selectedItems[props.item.id]));
  const toggleItem = useSearchStore((state) => state.toggleItem);

  const chunks = query.length
    ? props.item.name
        .toLowerCase()        
        .replaceAll(query.toLowerCase(), `-,${query.toLowerCase()}-,`)
        .split("-,")
        .map((chunk) => {
          const highlight = chunk.toLowerCase() === query.toLowerCase()
          const indx = props.item.name.toLowerCase().indexOf(chunk)
          const text = props.item.name.slice(indx, indx + chunk.length)

          return {
            highlight,
            text,
          }
        })
    : [{ highlight: false, text: props.item.name }];

  const handlePress = useCallback(() => {
    toggleItem(props.item.id.toString(), props.item);
  }, [props.item]);

  return (
    <TouchableOpacity onPress={handlePress} className="flex-row items-center gap-4 p-2">
      <View
        className={`border size-5 flex items-center justify-center rounded ${
          isSelected ? "bg-blue-500 border-blue-500" : "border-slate-400"
        }`}
      >
        {isSelected && <Ionicons name="checkmark" size={14} color="white" />}
      </View>

      <Image src={props.item.image} className="size-14 rounded-lg" />
      <View>
        <BaseText className="text-lg">
          {chunks.map((chunk, index) =>
            chunk.highlight ? (
              <BaseText key={`${chunk.highlight}-${index}`} className="font-extrabold">
                {chunk.text}
              </BaseText>
            ) : (
              chunk.text
            )
          )}
        </BaseText>

        <BaseText tint>{props.item.episode.length} Episodes</BaseText>
      </View>
    </TouchableOpacity>
  );
}
