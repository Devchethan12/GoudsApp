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
  uploadBoxContainer: {
    borderColor: '#9AA6B2',
    borderWidth: 0.6,
    borderRadius: 10,
    padding: 6,
    color: '#000000',
    marginVertical: 12,
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    backgroundColor: '#000000',
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  placeholderContainer: {
    paddingLeft: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  uploadText: {
    color: '#9AA6B2',
    flex: 1,
  },
  uploadIcon: {
    marginLeft: 10,
  },
  errors: {
    marginTop: -6,
    color: '#FF4545',
  },
  errorcontainer: {
    paddingLeft: 16,
    height: 16,
  },
  height16: {height: 16},
});
