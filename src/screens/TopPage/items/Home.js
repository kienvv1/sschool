import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions ,
  FlatList
} from 'react-native';
import {Sizes} from '../../../utils/resource';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useQuery} from 'react-query';
import {useSelector} from 'react-redux';
import {FetchApi} from '../../../utils/modules';
import {Loading} from '../../../elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({navigation}) => {
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width: screenWidth } = Dimensions.get('window');
  const [expandedSections, setExpandedSections] = useState([]);
  // useEffect(() => {
  //   const scrollInterval = setInterval(() => {
  //     const nextIndex = (currentIndex + 1) % data.length;
  //     setCurrentIndex(nextIndex);

  //     // Cuộn đến vị trí của mục tiếp theo
  //     if (scrollViewRef.current) {
  //       scrollViewRef.current.scrollTo({
  //         x: nextIndex * screenWidth, // Sử dụng kích thước màn hình làm độ rộng
  //         animated: true,
  //       });
  //     }
  //   }, 3000); // Cuộn sau mỗi 3 giây

  //   return () => clearInterval(scrollInterval);
  // }, [currentIndex, data, screenWidth]);
  const studentId = useSelector(state => state?.data?.data?._id);
  useEffect(() => {
    const saveStudentId = async () => {
      try {
        if (studentId) {
          await AsyncStorage.setItem('studentId', studentId.toString());
          console.log('Đã lưu mã sinh viên thành công.');
        } else {
          console.log('Lưu mã sinh viên thất bại.');
        }
      } catch (error) {
        console.error('Lỗi khi lưu mã sinh viên:', error);
      }
    };

    saveStudentId();
  }, []);
  const {data, isLoading} = useQuery('useGetNewsType', async () => {
    const ID = await AsyncStorage.getItem('studentId');
    let updatestudenID;
    if (ID) {
      updatestudenID = ID;
    } else {
      updatestudenID = studentId;
    }
    const news = FetchApi.getNews(updatestudenID);
    return news;
  });
  if (isLoading) {
    return <Loading />;
  }
  



  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.menu}>
        <View
          style={{
            backgroundColor: '#FF9966',
            borderRadius: 11,
            width: '45%',
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('HocPhi')}>
            <Icon
              name="payments"
              size={30}
              color="#423A9F"
              style={styles.icon}
            />
            <Text
              style={{
                color: 'black',
                paddingHorizontal: 10,
                fontWeight: 500,
                fontSize: 16,
                marginTop: -7,
              }}>
              Học phí
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            backgroundColor: '#99FFCC',
            borderRadius: 11,
            width: '45%',
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('XinNghi')}>
            <Ionicons
              style={styles.icon}
              name={'newspaper-sharp'}
              size={30}
              color={'#423A9F'}
            />
            <Text
              style={{
                color: 'black',
                paddingHorizontal: 10,
                fontWeight: 500,
                fontSize: 16,
                marginTop: -7,
              }}>
              Xin nghỉ
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.menu1}>
        <View
          style={{
            backgroundColor: '#33CCFF',
            borderRadius: 11,
            width: '45%',
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('TinTuc')}>
            <Icon
              name="article"
              size={30}
              color="#423A9F"
              style={styles.icon}
            />
            <Text
              style={{
                color: 'black',
                paddingHorizontal: 10,
                fontWeight: 500,
                fontSize: 16,
                marginTop: -7,
              }}>
              Tin tức
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            backgroundColor: '#FF99FF',
            borderRadius: 11,
            width: '45%',
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('DichVu')}>
            <Icon
              name="home-repair-service"
              size={30}
              color="#423A9F"
              style={styles.icon}
            />
            <Text
              style={{
                color: 'black',
                paddingHorizontal: 10,
                fontWeight: 500,
                fontSize: 16,
                marginTop: -7,
              }}>
              Dịch vụ
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.menu1}>
        <View
          style={{
            backgroundColor: '#FFCC33',
            borderRadius: 11,
            width: '45%',
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('ThucDon')}>
            <Icon
              name="restaurant"
              size={30}
              color="#423A9F"
              style={styles.icon}
            />
            <Text
              style={{
                color: 'black',
                paddingHorizontal: 10,
                fontWeight: 500,
                fontSize: 16,
                marginTop: -7,
              }}>
              Thực Đơn
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            backgroundColor: '#FFCCCC',
            borderRadius: 11,
            width: '45%',
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('HoatDong')}>
            <Icon
              name="bookmarks"
              size={30}
              color="#423A9F"
              style={styles.icon}
            />
            <Text
              style={{
                color: 'black',
                paddingHorizontal: 10,
                fontWeight: 500,
                fontSize: 16,
                marginTop: -7,
              }}>
              Hoạt động
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{marginTop:5}}>
        <Text style={{color:'green', fontSize:28, fontWeight:900}}>
          Tin tức nổi bật
        </Text>
      </View>
      <ScrollView
      ref={scrollViewRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ width: screenWidth }}
    >
     {data.length > 0 ? (
  data.map((item, index) => (
    <TouchableOpacity
      key={item.id}
      style={{ flexDirection: 'row', width: screenWidth, height: 'auto' }}
      onPress={() =>
        navigation.navigate('NewAndBlogDetail', { dataProps: item })
      }
    >
      <View style={styles.blockList} key={index}>
        <Image
          style={{ flex: 0.8, height: '90%', marginLeft:5 }}
          source={{
            uri: item.url_image,
          }}
        />
        <View style={{ marginLeft: 10, flex: 1 }}>
          <Text
            style={{
              fontWeight: '600',
              color: 'black',
              fontSize: Sizes.h5,
            }}
            numberOfLines={3}
          >
            {item.title}
          </Text>
          <Text
            style={{
              fontWeight: '600',
              color: 'gray',
              fontSize: Sizes.h6,
            }}
            numberOfLines={2}
          >
            {item.note}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  ))
) : (
  <Text>Không có dữ liệu</Text>
)}

    </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  menu: {
    flexDirection: 'row',
    paddingHorizontal: 7,
    paddingVertical: 7,
    marginTop: 10,
    width: '100%',
    height: '20%',
    justifyContent: 'space-around',
  },
  menu1: {
    flexDirection: 'row',
    paddingHorizontal: 7,
    paddingVertical: 7,

    width: '100%',
    height: '20%',
    justifyContent: 'space-around',
  },
  header: {
    backgroundColor: '#FFFFCC',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 15,
    alignItems: 'center',
    color: 'black',
  },
  content: {
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#FFFFCC',
  },
  icon: {
    width: '34%',
    height: '60%',
    borderRadius: 29,
    overflow: 'hidden',
    borderColor: 'black',
   
    marginHorizontal: 10,
    marginVertical: 5,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderEndEndRadius:10
  },
  textIcon: {
    color: 'black',
    marginHorizontal: 30,
  },
  head: {height: 30, backgroundColor: '#f1f8ff'},
  text: {textAlign: 'center', color: 'black'},
  wrapper: {flexDirection: 'row'},
  title: {flex: 1, backgroundColor: '#f6f8fa'},
  row: {height: 30},
  blockList: {
    height: 'auto',
    width: '95%',
  
    paddingVertical: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: '#CCFF66',
    flexDirection: 'row',
   
  },
});
export default HomeScreen;
