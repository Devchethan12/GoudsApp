/* eslint-disable react/no-unstable-nested-components */
import React, {forwardRef, useMemo, useState} from 'react';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {styles} from './styles';

export type Ref = BottomSheet;

interface Props {
  children: React.ReactNode;
  snapPoints?: string[];
}

const CustomBottomSheet = forwardRef<Ref, Props>(
  ({children, snapPoints}, ref) => {
    const defaultSnapPoints = useMemo(() => ['25%', '50%', '70%', '90%'], []);
    const [isOpen, setIsOpen] = useState(false);

    const handleSheetChange = (index: number) => {
      setIsOpen(index > -1);
    };

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        keyboardBehavior="interactive"
        enableContentPanningGesture={false}
        snapPoints={
          snapPoints && snapPoints.length > 0 ? snapPoints : defaultSnapPoints
        }
        onChange={handleSheetChange}
        backdropComponent={props => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
          />
        )}
        animateOnMount={false}
        containerStyle={isOpen ? styles.bottomSheetWrapper : {}}
        enableDynamicSizing={false}
        enablePanDownToClose={true}>
        <BottomSheetView style={styles.container}>{children}</BottomSheetView>
      </BottomSheet>
    );
  },
);

export default CustomBottomSheet;
