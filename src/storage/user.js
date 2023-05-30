import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({name: 'myDatabase.db', location: 'default'});
const defaultAvatar = 'https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-6/348987708_1270949830189898_6659052349064814953_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=HGLV6nMivIsAX9EevgK&_nc_ht=scontent.fhan17-1.fna&oh=00_AfAZZLl6tsfM8uDUttF7jlycS7o5_MZwxb43fZmwTczFpw&oe=6471C484';
const defaultBg = 'https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-6/349018307_648840813780346_8771741296418725849_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=e3f864&_nc_ohc=42rDsZalkN8AX-2MVhM&_nc_ht=scontent.fhan17-1.fna&oh=00_AfDQI3xRcgfNI8tg2GYb2o7CPUd2x3thEsn6cEQxMoujbA&oe=647152EF';

const createTableQuery =
  'CREATE TABLE IF NOT EXISTS myUser (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255) NOT NULL, email VARCHAR(50) NOT NULL, password VARCHAR(50) NOT NULL, avatar VARCHAR(500), background VARCHAR(500))';

export const addUserToDB = (name, username, password) => {
  db.transaction(tx => {
    tx.executeSql(
      createTableQuery,
      [],
      (_, result) => {
        // table created successfully
        console.log('Table myUser created successfully');
        console.log(result);
      },
      (_, error) => {
        // Handle created error here
        console.log(error);
      },
    );
    //Insert data into the table
    tx.executeSql(
      'INSERT INTO myUser (name, email, password, avatar, background) VALUES (?,?,?,?,?)',
      [name, username, password, defaultAvatar, defaultBg],
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
          'SELECT * FROM myUser',
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

export const deleteUserTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'DROP TABLE IF EXISTS myUser',
      [], // Pass any necessary parameters here
      () => {
        console.log('Deleted myUser table!');
      },
      (_, err) => {
        console.log(err);
      },
    );
  });
};
