import { useFonts } from 'expo-font';
import { NotoSansKR_400Regular, NotoSansKR_500Medium, NotoSansKR_700Bold } from '@expo-google-fonts/noto-sans-kr';
import Ionicons from '@expo/vector-icons/Ionicons';

export const useAppFonts = (): boolean => {
  const [fontsLoaded] = useFonts({
    NotoSansKR_400Regular,
    NotoSansKR_500Medium,
    NotoSansKR_700Bold,
    ...Ionicons.font,
  });

  return fontsLoaded;
};
