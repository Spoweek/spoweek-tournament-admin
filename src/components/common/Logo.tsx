import React from 'react';
import { Image, StyleSheet, ImageStyle, ImageProps } from 'react-native';

export type LogoSize = 'small' | 'medium' | 'large' | 'xlarge';

export interface LogoProps extends Omit<ImageProps, 'style'> {
  size?: LogoSize | number;
  width?: number;
  height?: number;
  style?: ImageStyle;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'medium', 
  width, 
  height, 
  style, 
  ...props 
}) => {
  // Define size presets
  const sizePresets: Record<LogoSize, number> = {
    small: 40,
    medium: 80,
    large: 120,
    xlarge: 160,
  };

  // Get the size value (either from preset or direct number)
  const logoSize = typeof size === 'number' ? size : sizePresets[size] || sizePresets.medium;

  // Determine width and height
  let logoWidth: number | undefined = width || logoSize;
  let logoHeight: number | undefined = height || logoSize;

  // If only width is specified, let height adjust automatically
  if (width && !height) {
    logoHeight = undefined; // Let aspect ratio determine height
  }
  
  // If only height is specified, let width adjust automatically
  if (height && !width) {
    logoWidth = undefined; // Let aspect ratio determine width
  }

  return (
    <Image
      source={require('../../../assets/images/logos/spoweek-logo.svg')}
      style={[
        styles.logo,
        {
          width: logoWidth,
          height: logoHeight,
        },
        style,
      ]}
      resizeMode="contain"
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  logo: {
    // Base styles for the logo
    alignSelf: 'center',
  },
});

export default Logo;
