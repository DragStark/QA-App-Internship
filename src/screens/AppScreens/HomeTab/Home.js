import {StyleSheet, Text, View, Dimensions, Button} from 'react-native';
import React, {useState} from 'react';
import {COLORS, ROUTES} from '../../../constants';
import {userSelector, roomsCollector} from '../../../redux/selector';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import AddRoomModal from './AddRoomModal';
import {addRoom, removeRoom} from './roomSlice';
import {removeMessageAndAnswer} from '../ChatTab/messagesSlice';
import Icon from 'react-native-vector-icons/Ionicons';
import {addRoomToDB} from '../../../storage/roomChat';

const {width} = Dimensions.get('screen');

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [deleteRoomId, setDeleteRoomId] = useState(0);
  const user = useSelector(userSelector);
  const allRoomsList = useSelector(roomsCollector);
  const roomsList = useSelector(roomsCollector).filter(
    room => room.userId === user.id,
  );
  const navigation = useNavigation();
  const dispatch = useDispatch();
  navigation.setOptions({
    tabBarVisible: true,
  });
  console.log(roomsList);

  const roomRender = () => {
    return roomsList.map(room => (
      <View key={room.id} style={styles.roomWrapper}>
        <TouchableOpacity
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
        <TouchableOpacity
          styles={styles.btnDeleteRoom}
          onPress={() => handleDeleteRoom(room.id)}>
          <Icon name="trash" color="red" size={25} />
        </TouchableOpacity>
      </View>
    ));
  };

  const handleSaveRoom = room => {
    // console.log(room);
    dispatch(
      addRoom({
        id: allRoomsList.length > 0 ? allRoomsList[allRoomsList.length - 1].id + 1 : 0,
        name: room.name,
        description: room.description,
        userId: user.id,
        category: room.category,
      }),
    );
    setModalVisible(false);
  };

  const handleDeleteRoom = roomId => {
    setConfirmVisible(true);
    setDeleteRoomId(roomId);
  };
  const handleConfirmDelete = () => {
    setConfirmVisible(false);
    //remove room in redux
    dispatch(removeRoom(deleteRoomId));
    //remove message of room in redux
    dispatch(removeMessageAndAnswer(deleteRoomId));
    //remove message in DB
    //remove message of room in DB
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
          <ScrollView style={styles.roomList}>
            {roomsList.length > 0 && roomRender()}
          </ScrollView>
        </View>
      </View>
      {confirmVisible && <View style={styles.opacityBg}></View>}
      {confirmVisible && (
        <View style={styles.confirmPopup}>
          <Text>Bạn có chắc chắn muốn xóa phòng chat này không ?</Text>
          <View style={styles.btnGroup}>
            <TouchableOpacity
              style={styles.btnConfirm}
              onPress={() => setConfirmVisible(false)}>
              <Text style={styles.btnConfirmLabel}>Không</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnConfirm}
              onPress={handleConfirmDelete}>
              <Text style={styles.btnConfirmLabel}>Có</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
  roomWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
  },
  room: {
    width: 290,
    borderRightWidth: 0.5,
    marginRight: 10,
    borderColor: COLORS.primary,
  },
  roomTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  roomDescription: {
    fontStyle: 'italic',
  },
  roomCategory: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  btnDeleteRoom: {
    width: 20,
    height: 20,
    bgColor: COLORS.primary,
  },
  confirmPopup: {
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
  },
  opacityBg: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.black,
    opacity: 0.2,
    width: '100%',
    height: '100%',
  },
  btnGroup: {
    flexDirection: 'row',
    width: '70%',
    marginTop: 20,
    justifyContent: 'space-between',
  },
  btnConfirm: {
    backgroundColor: COLORS.primary,
    width: 160,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  btnConfirmLabel: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
