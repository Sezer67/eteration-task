import React from 'react';
import { Text, TextStyle, StyleSheet, TextProps } from 'react-native';

type TextType = 'h1' | 'h2' | 'h3' | 'normal';

interface UITextProps extends TextProps {
  type?: TextType;
  style?: TextStyle;
  children: React.ReactNode;
}

// Text bileşeni
const UIText: React.FC<UITextProps> = ({ type = 'normal', children, style, ...props }) => {
  const titleStyles: Record<TextType, TextStyle> = {
    h1: styles.h1,
    h2: styles.h2,
    h3: styles.h3,
    normal: styles.normal,
  };

  const textStyle = titleStyles[type];

  return (
    <Text style={[textStyle, styles.defaultStyle, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  h2: {
    fontSize: 28,
    fontWeight: '600',
  },
  h3: {
    fontSize: 24,
    fontWeight: '500',
  },
  normal: {
    fontSize: 16,
  },
  defaultStyle: {
    color: '#000',
  }
});

export default UIText;
