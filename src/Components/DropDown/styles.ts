import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#Ffffff',
  },
  textBoxContainer: {
    borderColor: '#9AA6B2',
    borderWidth: 0.6,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: 344,
    color: '#000000',
    marginBottom: 12,
    height: 50,
  },
  placeholderStyle: {
    color: '#9aa6b2',
    fontSize: 14,
  },
  selectedText: {
    fontSize: 14,
    paddingHorizontal: 4,
    color: '#00000',
  },
  dropdownContainer: {
    borderRadius: 10,
    top: 32,
    borderColor: '#9aa6b2',
  },
  dropdownSeperator: {
    borderBottomWidth: 0.6,
    borderBottomColor: '#9aa6b2',
    borderRadius: 10,
    top: 1,
  },
  rightIcon: {
    height: 20,
    width: 20,
  },
  itemContainer: {
    height: 58,
    padding: 10,
    justifyContent: 'center',
    borderRadius: 4,
    color: '#000000',
  },
  itemLabel: {
    fontSize: 16,
    color: '#9aa6b2',
    fontWeight: '400',
  },
  itemSubText: {
    fontSize: 12,
    color: '#9aa6b2',
    marginTop: 4,
  },
  dropdownButton: {
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#9aa6b2',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    width: 70,
  },
  containerBorderRadius: {
    borderRadius: 6,
  },
});
