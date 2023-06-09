import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({name: 'myDatabase.db', location: 'default'});

export const createAnswersTable = () => {
  db.transaction(tx => {
    //create table
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS myAnswers (id INTEGER PRIMARY KEY AUTOINCREMENT, belongToQuestion TEXT NOT NULL,content TEXT NOT NULL, category VARCHAR NOT NULL, castTimes INTEGER NOT NULL)',
      [],
      () => {
        // Data inserted successfully
        console.log('Create myAnswers table successfully');
      },
      (_, error) => {
        // Handle insertion error here
        console.log(error);
      },
    );
  });
};

export const addAnswerToDB = () => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO myAnswers (belongToQuestion, content, category, castTimes) VALUES (?,?,?,?)',
      ['Học digital painting có thể làm những nghề nghiệp gì ?','Bạn có thể bắt đầu bằng việc nhận các job freelancer, sau đó khi có các sản phẩm nhất định và được người dùng tin tưởng, hãy bắt đầu xây dựng thương hiện cho mình, có thể xây dựng kênh youtube, tiktok. Một hướng đi an toàn hơn là bạn sẽ xin ứng tuyển vào các công ty có vị trí artist designer, ví dụ các công ty về game, về đồ ăn v.v...','Nghệ thuật', 0],
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

export const updateCastTimesById = id => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE myAnswers SET castTimes = castTimes + 1 WHERE id = ?',
      [id],
      (_, result) => {
        // Data inserted successfully
        console.log('increased castTimes of question', id);
        console.log(result);
      },
      (_, error) => {
        // Handle insertion error here
        console.log(error);
      },
    );
  });
};

export const getAnswersListFromDB = () => {
  //vì hàm db.transaction là hàm đồng bộ nên cần thời gian lấy dữ liệu, cần tạo ra promise để đợi hàm này hoạt động
  return new Promise((resolve, reject) => {
    let answersList = [];

    const pushDataToAnswerList = data => {
      answersList.push(data);
    };

    db.transaction(
      tx => {
        tx.executeSql(
          'SELECT * FROM myAnswers',
          [],
          (_, resultSet) => {
            const rows = resultSet.rows;
            for (let i = 0; i < rows.length; i++) {
              pushDataToAnswerList(rows.item(i));
            }
            resolve(answersList); // Resolve the promise with the messagesList
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

export const deleteAnswersTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'DROP TABLE IF EXISTS myAnswers',
      [], // Pass any necessary parameters here
      () => {
        console.log('Deleted myAnswers table!');
      },
      (_, err) => {
        console.log(err);
      },
    );
  });
};
