import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Sizes} from '../../utils/resource';

import {Loading} from '../../elements';
import {useQuery} from 'react-query';
import {FetchApi} from '../../utils/modules';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThucDon = ({navigation}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShowPicker(true);
  };
  const studentId = useSelector(state => state?.data?.data?._id);
  const formatDate = dateString => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  };
  const {data, isLoading} = useQuery(
    ['NewThucDon', formatDate(date)],
    async () => {
      const ID = await AsyncStorage.getItem('studentId');
      let updatestudenID;
      if (ID) {
        updatestudenID = ID;
      } else {
        updatestudenID = studentId;
      }

      const menu = await FetchApi.getMenusDay(updatestudenID, formatDate(date));
      return menu;
    },
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
        <View
          style={{
            height: 'auto',
            width:'100%',
            paddingHorizontal: 15,
            paddingVertical: 10,
            backgroundColor: 'white',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
         
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name={'arrow-back-outline'} size={30} color={'black'} />
          </TouchableOpacity>
          <Text style={{color: 'black', fontSize: 20}}>Thực Đơn</Text>
          <Ionicons name={'add-circle-sharp'} size={30} color={'white'} />
        </View>

        <TouchableOpacity onPress={showDatepicker}>
          <View
            style={{
              height: 'auto',
              width: '80%',
              paddingHorizontal: 15,
              paddingVertical: 10,
              marginHorizontal: 30,
              marginVertical: 10,
              borderRadius: 10,
              backgroundColor: '#CCFF66',
              // marginTop: insets.top,
              flexDirection: 'row',
              // alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Ionicons name={'calendar-outline'} size={30} color={'black'} />
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                marginVertical: 5,
                marginHorizontal: 18,
              }}>
              {data.day_at}
            </Text>
          </View>
        </TouchableOpacity>
        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}
        <ScrollView>
        {(data.meal || []).map((item, index) => {
          return (
            
            <React.Fragment key={index}>
              <Text style={{color: 'black', marginHorizontal: 20}}>
                {item?.meal_title}
              </Text>
              {/* Lặp qua thuộc tính của "food_op" */}
              {Object.keys(item.food_op || {}).map(foodKey => {
                return (
                  <View style={styles.blockList} key={foodKey}>
                    <Image
                      style={{width: '35%', height: 86, borderRadius: 10}}
                      source={{
                        uri:
                          item?.food_op[foodKey]?.image ??
                          'https://cdn-icons-png.flaticon.com/512/5470/5470133.png',
                      }}
                    />
                    <View
                      style={{
                        flex: 1,
                        marginLeft: 10,
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          fontWeight: '600',
                          color: 'black',
                          fontSize: Sizes.h5,
                        }}
                        multipleLines={true}
                        numberOfLines={10}>
                        {item.food_op[foodKey].title}
                      </Text>
                      <Text
                        style={{
                          fontWeight: '600',
                          color: 'gray',
                          fontSize: Sizes.h6,
                        }}
                        multipleLines={true}
                        numberOfLines={3}>
                        {item.food_op[foodKey].note}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </React.Fragment>
          );
        })}
        </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  blockList: {
    height: 'auto',
    width: 320,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: '#CCFF66',
    flexDirection: 'row',
  },
});
export default ThucDon;
