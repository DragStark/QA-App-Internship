import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({name: 'myDatabase.db', location: 'default'});

export const createAnswersTable = () => {
  db.transaction(tx => {
    //create table
    tx.executeSql(
      'CREATE TABLE IF NOT EXITS myAnswers (id INT AUTO_INCREMENT PRIMARY KEY, belongToQuestion TEXT NOT NULL,content TEXT NOT NULL, category INT NOT NULL)',
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

export const addAnswer = (belongToQuestion, content, category) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO myAnswers (belongToQuestion, content, category) VALUES (?,?,?)',
      [belongToQuestion, content, category],
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
