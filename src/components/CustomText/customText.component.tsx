import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, {
    LinearGradient,
    Text,
    Defs,
    Stop,
    TSpan
  } from 'react-native-svg';

export interface CustomTextProps {
    text: string;
    width: number;
    fontSize: number;
  }

const CustomText: React.FC<CustomTextProps> = (props) => {
    return(
        <Svg id={props.text} height={props.fontSize + 10} width={props.width}>
          <Defs>
            <LinearGradient id="rainbow" x1="0" x2="100%" y1="100%" y2="0%" gradientUnits="userSpaceOnUse" >
              <Stop stopColor="#1DB5FF" offset="0%" />
              <Stop stopColor="#7B40DC" offset="95.79%" />
            </LinearGradient>
          </Defs>
          <Text fill="url(#rainbow)">
            <TSpan fontWeight="bold" fontSize={props.fontSize} x="0" dy={props.fontSize}>{props.text}</TSpan>
          </Text>
        </Svg>
    );
}

const styles = StyleSheet.create({
    container: {
      
    },
});

export default CustomText;