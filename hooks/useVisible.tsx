import { useEffect, useState } from "react";
import { Keyboard, BackHandler } from "react-native";

export const useVisible = () => {
  const [visible, setVisible] = useState(false);

  const keyboard = Keyboard.addListener("keyboardDidShow", () => {
    setVisible(true);
  });

  const backPress = BackHandler.addEventListener("hardwareBackPress", () => {
    if (visible) {
      setVisible(false);
      return true;
    }

    return false;
  });

  useEffect(() => {
    return () => {
      backPress.remove();
      keyboard.remove();
    };
  }, []);

  return {
    visible,
    setVisible
  }
}
