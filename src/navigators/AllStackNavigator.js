import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import NewAndBlogDetail from '../screens/NewAndBlogDetail/NewAndBlogDetail';
// import Blog from '../screens/TopPage/items/Blog';
import HocPhi from '../screens/HocPhi/HocPhi';
import HomeScreen from '../screens/TopPage/items/Home';
import XinNghi from '../screens/XinNghi/XinNghi';
import DichVu from '../screens/DichVu/DichVu';
// import DanhGia from '../screens/DanhGia/DanhGia';
import Albums from '../screens/Albums/Albums';
import TinTuc from '../screens/TinTuc/TinTuc';
import TaoDonXinNghi from '../screens/TaoDonXinNghi/TaoDonXinNghi';
import LoiNhan from '../screens/LoiNhan/LoiNhan';
import TaoLoiNhanMoi from '../screens/TaoLoiNhanMoi/TaoLoiNhanMoi';
import Notification from '../screens/Notification/Notification';

import SucKhoe from '../screens/SucKhoe/SucKhoe';
import TableHeight from '../screens/TableHeight/TableHeight';
import TableWeight from '../screens/TableWeight/TableWeight';
import ThucDon from '../screens/ThucDon/ThucDon';
import NotificationDetail from '../screens/NotificationDetail/NotificationDetail';
import NhanXet from '../screens/NhanXet/NhanXet';
import DiemDanh from '../screens/DiemDanh/DiemDanh';
import HoatDong from '../screens/HoatDong/HoatDong';
import ChiTietNhanXet from '../screens/ChiTietNhanXet/ChiTietNhanXet';

const Stack = createStackNavigator();

const AllStackNavigator = ({navigation, route}) => {
  const {initialRouteName} = route.params;
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={initialRouteName}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="XinNghi" component={XinNghi} />
      <Stack.Screen name="TaoDonXinNghi" component={TaoDonXinNghi} />
      <Stack.Screen name="LoiNhan" component={LoiNhan} />
      <Stack.Screen name="TaoLoiNhanMoi" component={TaoLoiNhanMoi} />
      <Stack.Screen name="TinTuc" component={TinTuc} />
      <Stack.Screen name="Albums" component={Albums} />
      <Stack.Screen name="DichVu" component={DichVu} />
      {/* <Stack.Screen name="DanhGia" component={DanhGia} /> */}
      <Stack.Screen name="HocPhi" component={HocPhi} />
      {/* <Stack.Screen name="Blog" component={Blog} /> */}
      <Stack.Screen name="Notifications" component={Notification} />
      <Stack.Screen name="NewAndBlogDetail" component={NewAndBlogDetail} />
      <Stack.Screen name="SucKhoe" component={SucKhoe} />
      <Stack.Screen name="TableHeight" component={TableHeight} />
      <Stack.Screen name="TableWeight" component={TableWeight} />
      <Stack.Screen name="ThucDon" component={ThucDon} />
      <Stack.Screen name="Notification" component={NotificationDetail} />
      <Stack.Screen name="NhanXet" component={NhanXet} />
      <Stack.Screen name="DiemDanh" component={DiemDanh} />
      <Stack.Screen name="HoatDong" component={HoatDong} />
      <Stack.Screen name="ChiTietNhanXet" component={ChiTietNhanXet} />

    </Stack.Navigator>
  );
};
export default AllStackNavigator;
