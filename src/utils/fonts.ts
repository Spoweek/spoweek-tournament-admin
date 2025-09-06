import { useFonts } from 'expo-font';
import { NotoSansKR_400Regular, NotoSansKR_500Medium, NotoSansKR_700Bold } from '@expo-google-fonts/noto-sans-kr';

export const useAppFonts = (): boolean => {
  const [fontsLoaded] = useFonts({
    NotoSansKR_400Regular,
    NotoSansKR_500Medium,
    NotoSansKR_700Bold,
  });

  return fontsLoaded;
};
