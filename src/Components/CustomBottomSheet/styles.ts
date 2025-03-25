import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: 14,
    backgroundColor: '#F7f7f7',
    zIndex: 10,
  },
  bottomSheetWrapper: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
  },
  titleStyle: {
    paddingVertical: 12,
  },
  subTitleStyle: {
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginVertical: 20,
  },
});
