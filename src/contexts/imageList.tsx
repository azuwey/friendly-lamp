import React, { createContext, PropsWithChildren, useContext, useState } from "react";

const ImageListContext = createContext<[string[], React.Dispatch<React.SetStateAction<string[]>>]>([
  [],
  () => {
    throw new Error("ImageListContext cannot be used without ImageListProvider");
  },
]);

export function ImageListProvider(props: PropsWithChildren) {
  const imageListState = useState<string[]>([]);

  return (
    <ImageListContext.Provider value={imageListState}>{props.children}</ImageListContext.Provider>
  );
}

export function useImageList() {
  return useContext(ImageListContext);
}
