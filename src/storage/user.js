import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({name: 'myDatabase.db', location: 'default'});
const defaultAvatar =
  'https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-anh-avatar-luffy.jpg';
const defaultBg =
  'https://cdn.popsww.com/blog/sites/2/2022/02/Luffy-tro-thanh-vua-hai-tac-de-phieu-luu.jpg';

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

export const getLastUserFromDB = () => {
  //vì hàm db.transaction là hàm đồng bộ nên cần thời gian lấy dữ liệu, cần tạo ra promise để đợi hàm này hoạt động
  return new Promise((resolve, reject) => {
    let lastUser = {};

    db.transaction(
      tx => {
        tx.executeSql(
          'SELECT * FROM myUser',
          [],
          (_, resultSet) => {
            const rows = resultSet.rows;
            lastUser = rows.item(rows.length - 1);
            console.log(lastUser);
            resolve(lastUser); // Resolve the promise with the userList
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
