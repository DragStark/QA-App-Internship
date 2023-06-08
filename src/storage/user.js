import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({name: 'myDatabase.db', location: 'default'});
const defaultAvatar =
  'https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-6/348987708_1270949830189898_6659052349064814953_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=h_XN6XKTuaMAX9BCGdf&_nc_ht=scontent.fhan17-1.fna&oh=00_AfD5638X-k16iyuwVV1_kaBea7zTDUhlMPIIveX7aj31Dg&oe=647DA204';
const defaultBg =
  'https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-6/349018307_648840813780346_8771741296418725849_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=e3f864&_nc_ohc=tXK_-ZazvRMAX9pm4qg&_nc_ht=scontent.fhan17-1.fna&oh=00_AfA7IwHrO_eF94DdtHPAkvys4vzlF-XqklOUEu7w9CV2bw&oe=647F2AAF';

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
