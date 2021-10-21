import React from "react";
import { Spinner, VStack, Heading } from "native-base";

export const LoadingSpinner = ({ color }) => {
  return (
    <VStack space={4} alignItems="center">
      <Spinner color={color} size="lg" />
    </VStack>
  );
};
