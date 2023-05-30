import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React, {useState} from 'react';
import {COLORS, ROUTES} from '../../../constants';
import {userSelector, roomsCollector} from '../../../redux/selector';
import {useSelector ,useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import AddRoomModal from './AddRoomModal';
import { addRoom } from './roomSlice';

const {width} = Dimensions.get('screen');

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const user = useSelector(userSelector);
  const roomsList = useSelector(roomsCollector);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const roomRender = () => {
    return roomsList.map(room => (
      <TouchableOpacity
        key={room.id}
        style={styles.room}
        onPress={() =>
          navigation.navigate(ROUTES.CHAT, {
            roomId: room.id,
            roomName: room.name,
            roomDescription: room.description,
            roomCategory: room.category,
          })
        }>
        <Text style={styles.roomTitle}>{room.name}</Text>
        <Text style={styles.roomDescription}>{room.description}</Text>
        <Text style={styles.roomCategory}>{'Chủ đề: ' + room.category}</Text>
      </TouchableOpacity>
    ));
  };

  const handleSaveRoom = room => {
    console.log(room);
    dispatch(addRoom({
      id: roomsList.length + 1,
      name: room.name,
      description: room.description,
      userId: user.id,
      category: room.category,
    }));
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            {'> Hello ' + (user ? user.name : '') + ' !'}
          </Text>
        </View>
        <View style={styles.mainContent}>
          <View style={styles.chatHead}>
            <Text style={styles.chatTitle}>Đoạn Chat</Text>
            <TouchableOpacity
              style={styles.addChatRoom}
              onPress={() => setModalVisible(true)}>
              <Text style={styles.addChatText}>Thêm đoạn chat</Text>
            </TouchableOpacity>
            <AddRoomModal
              visible={modalVisible}
              onClose={() => setModalVisible(false)}
              onSave={handleSaveRoom}
            />
          </View>
          <ScrollView style={styles.roomList}>{roomRender()}</ScrollView>
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.bgColor,
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    height: '80%',
    marginTop: 10,
    marginBottom: 70,
    borderRadius: 5,
    width: width - 20,
    alignItems: 'center',
    padding: 10,
  },
  header: {
    borderBottomWidth: 1,
    width: width - 60,
    padding: 10,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 16,
  },
  mainContent: {
    width: width - 60,
  },
  chatHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'center',
  },
  chatTitle: {
    fontSize: 18,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  addChatRoom: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
  },
  addChatText: {
    color: COLORS.white,
  },
  room: {
    padding: 10,
    margin: 10,
    borderTopWidth: 1,
  },
  roomTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  roomDescription: {
    fontStyle: 'italic',
  },
  roomCategory: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});
