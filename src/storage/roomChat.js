import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({name: 'myDatabase.db', location: 'default'});

export const createRoomChatTable = () => {
  db.transaction(tx => {
    //create table
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS myRoomChat (id INTEGER PRIMARY KEY AUTOINCREMENT,name VARCHAR(50) NOT NULL, description VARCHAR(255) NOT NULL, userId INTEGER NOT NULL, category INTEGER NOT NULL)',
      [],
      () => {
        // Data inserted successfully
        console.log('Create myRoomChat table successfully');
      },
      (_, error) => {
        // Handle insertion error here
        console.log(error);
      },
    );
  });
};

export const addRoomToDB = (id, name, description, category, userId) => {
  db.transaction(tx => {
    //add user question
    tx.executeSql(
      'INSERT INTO myRoomChat (id, name, description, category, userId) VALUES (?,?,?,?,?)',
      [id, name, description, category, userId],
      (_, result) => {
        // Data inserted successfully
        console.log('user room chat inserted successfully');
        console.log(result);
      },
      (_, error) => {
        // Handle insertion error here
        console.log(error);
      },
    );
  });
};

export const deleteRoomById = (id) => {
  db.transaction(tx => {
    //add user question
    tx.executeSql(
      'DELETE FROM myRoomChat WHERE id = ?',
      [id],
      (_, result) => {
        // Data inserted successfully
        console.log('deleted room', id);
        console.log(result);
      },
      (_, error) => {
        // Handle insertion error here
        console.log(error);
      },
    );
  });
};

export const getRoomList = () => {
  //vì hàm db.transaction là hàm đồng bộ nên cần thời gian lấy dữ liệu, cần tạo ra promise để đợi hàm này hoạt động
  return new Promise((resolve, reject) => {
    let roomList = [];

    const pushDataToRoomList = data => {
      roomList.push(data);
    };

    db.transaction(
      tx => {
        tx.executeSql(
          'SELECT * FROM myRoomChat',
          [],
          (_, resultSet) => {
            const rows = resultSet.rows;
            for (let i = 0; i < rows.length; i++) {
              pushDataToRoomList(rows.item(i));
            }
            resolve(roomList); // Resolve the promise with the messagesList
          },
          (_, error) => {
            reject(error); // Reject the promise with the error
          },
        );
      },
      error => {
        reject(error); // Reject the promise with the error
      },
    );
  });
};

export const deleteRoomChatTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'DROP TABLE IF EXISTS myRoomChat',
      [], // Pass any necessary parameters here
      () => {
        console.log('Deleted myMessages table!');
      },
      (_, err) => {
        console.log(err);
      },
    );
  });
};
