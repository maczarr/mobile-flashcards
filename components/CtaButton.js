import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function CtaButton ({ children, onPress, layout = 'dark', size }) {
  let btnStyles     = [styles.btn];
  let btnTxtStyles  = [styles.btnTxt];

  switch(layout) {
    case 'dark':
      btnStyles.push(styles.btnDark);
      btnTxtStyles.push(styles.btnTxtDark);
      break;
    case 'light':
      btnStyles.push(styles.btnLight);
      btnTxtStyles.push(styles.btnTxtLight);
      break;
    case 'positive':
      btnStyles.push(styles.btnPositive);
      btnTxtStyles.push(styles.btnTxtPositive);
      break;
    case 'false':
      btnStyles.push(styles.btnFalse);
      btnTxtStyles.push(styles.btnTxtFalse);
      break;
  }

  switch(size) {
    case 'wide':
      btnStyles.push(styles.btnWide);
      btnTxtStyles.push(styles.btnTxtWide);
      break;
  }

  return (
    <TouchableOpacity onPress={onPress} style={btnStyles}>
      <Text style={btnTxtStyles}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btn: {
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 20,
    height: 45,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#000',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnDark: {
    backgroundColor: '#000',
  },
  btnLight: {
    backgroundColor: '#fff',
  },
  btnPositive: {
    backgroundColor: '#0b0',
    borderColor: '#0b0',
  },
  btnFalse: {
    backgroundColor: '#b00',
    borderColor: '#b00',
  },
  btnWide: {
    paddingTop: 30,
    paddingBottom: 30,
    width: '65%',
  },
  btnTxt: {
    fontSize: 22,
    textAlign: 'center',
  },
  btnTxtDark: {
    color: '#fff',
  },
  btnTxtLight: {
    color: '#000',
  },
  btnTxtPositive: {
    color: '#fff',
  },
  btnTxtFalse: {
    color: '#fff',
  },
  btnTxtWide: {
    fontSize: 20,
  },
})