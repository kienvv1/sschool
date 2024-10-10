import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Input,
  Button,
  StyleSheet,
  Image,
  SafeAreaView,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import {FetchApi} from '../../utils/modules';
import {AppButton} from '../../elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const DiemDanh = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: 'black',
        }}>
        Điểm danh
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default DiemDanh;
