import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({name: 'myDatabase.db', location: 'default'});

export const addUserToDB = (name, username, password) => {
  db.transaction(tx => {
    // Insert data into the table
    tx.executeSql(
      'INSERT INTO ABC (name, email, password) VALUES (?,?,?)',
      [name, username, password],
      (_, result) => {
        // Data inserted successfully
        console.log('Data inserted successfully');
        console.log(result);
      },
      (_, error) => {
        // Handle insertion error here
        console.log(error);
      },
    );
  });
};

export const getUserListFromDB = () => {
    //vì hàm db.transaction là hàm đồng bộ nên cần thời gian lấy dữ liệu, cần tạo ra promise để đợi hàm này hoạt động
  return new Promise((resolve, reject) => {
    let userList = [];

    const pushDataToUserList = data => {
      userList.push(data);
    };

    db.transaction(
      tx => {
        tx.executeSql(
          'SELECT * FROM ABC',
          [],
          (_, resultSet) => {
            const rows = resultSet.rows;
            for (let i = 0; i < rows.length; i++) {
              pushDataToUserList(rows.item(i));
            }
            resolve(userList); // Resolve the promise with the userList
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
