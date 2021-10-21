import React from "react";
import { Spinner, HStack, Heading } from "native-base";
// import { componentsColor } from "../constants/Color";
export const LoadingHandleText = ({ color }) => {
  return (
    <HStack space={2} alignItems="center">
      <Spinner accessibilityLabel="Loading posts" color={color} />
      <Heading color={color} fontSize="lg">
        Loading
      </Heading>
    </HStack>
  );
};
