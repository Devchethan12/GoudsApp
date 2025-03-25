import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
  label: {
    backgroundColor: '#ffffff',
    position: 'absolute',
    top: 2,
    zIndex: 100,
    marginLeft: 16,
    paddingLeft: 2,
  },
  textBoxContainer: {
    borderColor: '#9AA6B2',
    borderWidth: 0.6,
    borderRadius: 10,
    padding: 12,
    paddingHorizontal: 18,
    marginVertical: 12,
    height: 50,
    width: 344,
    fontSize: 14,
  },
  errors: {
    marginHorizontal: 18,
    marginBottom: 10,
    marginTop: -4,
    fontSize: 12,
    color: '#FF4545',
  },
  password: {
    position: 'absolute',
    right: 16,
    top: 26,
  },
  rightIcon: {
    position: 'absolute',
    right: 12,
    top: 2,
  },
});
