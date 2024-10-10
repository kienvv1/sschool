import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { Sizes } from '../../utils/resource';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { FetchApi } from '../../utils/modules';
import { useQuery } from 'react-query';
import { Loading } from '../../elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
const LoiNhan = ({ navigation }) => {
  const studentId = useSelector(state => state?.data?.data?._id);
  const [data, setData] = useState(null);
  const [cd, setCd] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async () => {
    try {
      const ID = await AsyncStorage.getItem('studentId');
      let updatestudenID;
      if (ID) {
        updatestudenID = ID;
      } else {
        updatestudenID = studentId;
      }
      const advice = await FetchApi.getAdvice(updatestudenID);
      const advicecd = await FetchApi.getAdvicecd(updatestudenID);
      const newData = advice;
      const newCd = advicecd;
      setData(newData);
      setCd(newCd);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      fetchData();
    });

    // Loại bỏ trình nghe khi component bị hủy
    return () => {
      focusListener();
    };
  }, [navigation]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>

      <View
        style={{
          height: 'auto',
          width: '100%',
          paddingHorizontal: 15,
          paddingVertical: 10,
          backgroundColor: 'white',
          // marginTop: insets.top,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name={'arrow-back-outline'} size={30} color={'black'} />
        </TouchableOpacity>
        <Text style={{ color: 'black', fontSize: 20 }}>LỜI NHẮN</Text>
        <Ionicons name={'add-circle-sharp'} size={30} color={'white'} />
      </View>

      <TouchableOpacity style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }} onPress={() => navigation.navigate('TaoLoiNhanMoi')}>
        <View
          style={{
            height: 'auto',
            width: '90%',

            paddingHorizontal: 15,
            paddingVertical: 10,
            marginVertical: 10,
            borderRadius: 10,
            backgroundColor: 'white',
            // marginTop: insets.top,
            flexDirection: 'row',
            alignItems: 'center',
            // justifyContent: 'space-between',
          }}>
          <Ionicons name={'add-circle-sharp'} size={30} color={'#7EA2FE'} />
          <Text style={{ color: 'black', fontSize: 16, marginVertical: 5 }}>
            Gửi lời nhắn mới{' '}
          </Text>
        </View>
      </TouchableOpacity>
      <Text style={{ color: 'black', fontSize: 17, marginHorizontal: 20 }}>
        Danh sách lời nhắn{' '}
      </Text>
      <ScrollView style={{ width: '100%' }}>
        {(cd || []).map((item, index) => {
          return (
            <View style={styles.blockList} key={index}>
              <View style={{ flexDirection: 'row' }}>
                <Ionicons
                  name={`checkmark-circle-sharp`}
                  size={20}
                  color={'gray'}
                />
                <Text style={{ color: 'black', fontSize: 16 }}>Chưa duyệt</Text>
              </View>
              <Text style={{ color: 'black', fontSize: 16, marginVertical: 5 }}>
                Lời nhắn đến {item.user_fullname}
              </Text>
              <Text style={{ color: 'black', fontSize: 14, marginVertical: 5 }}>
                Nội dung: {item.content}
              </Text>
              <Text
                style={{
                  color: '#BFBFBF',
                  fontSize: 12,
                  marginVertical: 5,
                  alignSelf: 'flex-end',
                }}>
                Gửi lúc {item.date_at}
              </Text>
            </View>
          );
        })}
        {(data || []).map((item, index) => {
          return (
            <View style={styles.blockList} key={index}>
              <View style={{ flexDirection: 'row' }}>
                <Ionicons
                  name={`checkmark-circle-sharp`}
                  size={20}
                  color={'green'}
                />
                <Text style={{ color: 'black', fontSize: 16 }}>Đã duyệt</Text>
              </View>
              <Text style={{ color: 'black', fontSize: 16, marginVertical: 5 }}>
                Lời nhắn đến {item.user_fullname}
              </Text>
              <Text style={{ color: 'black', fontSize: 14, marginVertical: 5 }}>
                Nội dung: {item.content}
              </Text>
              <Text
                style={{
                  color: '#BFBFBF',
                  fontSize: 12,
                  marginVertical: 5,
                  alignSelf: 'flex-end',
                }}>
                Gửi lúc {item.date_at}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDDDDD',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  blockList: {
    height: 'auto',
    width: '90%',

    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
});
export default LoiNhan;
