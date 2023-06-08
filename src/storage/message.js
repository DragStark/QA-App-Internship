import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({name: 'myDatabase.db', location: 'default'});

export const createMessagesTable = () => {
  db.transaction(tx => {
    //create table
    tx.executeSql(
      'CREATE TABLE IF NOT EXITS myMessages (id INT PRIMARY KEY,message TEXT NOT NULL, roomId INT NOT NULL, userId INT NOT NULL)',
      [],
      () => {
        // Data inserted successfully
        console.log('Create myMessages table successfully');
      },
      (_, error) => {
        // Handle insertion error here
        console.log(error);
      },
    );
  });
};

export const addMessageToDB = (id, message, roomId, userId) => {
  db.transaction(tx => {
    //add user question
    tx.executeSql(
      'INSERT INTO myMessages (id, message, roomId, userId) VALUES (?,?,?,?)',
      [id, message, roomId, userId],
      (_, result) => {
        // Data inserted successfully
        console.log('user message inserted successfully');
        console.log(result);
      },
      (_, error) => {
        // Handle insertion error here
        console.log(error);
      },
    );
  });
};

export const getMessagesListFromDB = () => {
  //vì hàm db.transaction là hàm đồng bộ nên cần thời gian lấy dữ liệu, cần tạo ra promise để đợi hàm này hoạt động
  return new Promise((resolve, reject) => {
    let messagesList = [];

    const pushDataToMessagesList = data => {
      messagesList.push(data);
    };

    db.transaction(
      tx => {
        tx.executeSql(
          'SELECT * FROM myMessages',
          [],
          (_, resultSet) => {
            const rows = resultSet.rows;
            for (let i = 0; i < rows.length; i++) {
              pushDataToMessagesList(rows.item(i));
            }
            resolve(messagesList); // Resolve the promise with the messagesList
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

export const deleteMessagesTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'DROP TABLE IF EXISTS myMessages',
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
