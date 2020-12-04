import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from "prop-types";
import { LinearTextGradient } from "react-native-text-gradient";

export interface CustomTextProps {
    text: string;
  }

const CustomText: React.FC<CustomTextProps> = (props) => {
    return(
        <LinearTextGradient
        style={{ fontWeight: "bold", fontSize: 72 }}
        locations={[0, 1]}
        colors={["red", "blue"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        >
            {props.text}
        </LinearTextGradient>
    );
}

const styles = StyleSheet.create({
    container: {
      
    },
});

export default CustomText;