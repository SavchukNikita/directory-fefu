const DATABASE_V_KEY = 'database__v';

const init = (nameDb, version = 1) => new Promise((resolve, reject) => {
  const openRequest = indexedDB.open(nameDb, version);

  openRequest.onupgradeneeded = () => {
    const db = openRequest.result;
    if (!db.objectStoreNames.contains('Department')) {
      db.createObjectStore('Department', { keyPath: 'id' });
    }

    if (!db.objectStoreNames.contains('Score')) {
      db.createObjectStore('Score', { keyPath: 'id' });
    }

    if (!db.objectStoreNames.contains('ScoreDepartment')) {
      db.createObjectStore('ScoreDepartment', { keyPath: 'id' });
    }
  };

  openRequest.onerror = () => {
    reject(openRequest.error);
  };

  openRequest.onsuccess = () => {
    const db = openRequest.result;
    resolve(db);
  };
});

const addEl = (transaction, element) => new Promise((resolve, reject) => {
  const request = transaction.add(element);

  request.onsuccess = () => {
    resolve(request.result);
  };

  request.onerror = () => {
    reject(request.error);
  };
});

const addTransaction = (db, element, tableName) => new Promise((resolve, reject) => {
  const transaction = db.transaction(tableName, 'readwrite');
  const department = transaction.objectStore(tableName);
  addEl(department, element)
    .then((res) => console.log('Сущность создана', res))
    .catch((error) => console.log('Ошибка создании сущности', error));

  transaction.oncomplete = () => {
    resolve(transaction.result);
  };

  transaction.onabort = () => {
    reject(transaction.error);
  };
});

const fill = async (textDep, textScore, textDepScore, db) => {
  const objectArray = textDep.split('\n');

  for (let i = 0; i < objectArray.length; i += 1) {
    const o = objectArray[i].split(',');
    const tableItem = {
      id: o[0],
      name: o[1],
      lead: o[2],
      dependence: o[3],
      address: o[4],
      peopleCount: o[5],
    };

    // eslint-disable-next-line no-await-in-loop
    await addTransaction(db, tableItem, 'Department');
  }

  const objectArray1 = textScore.split('\n');
  for (let i = 0; i < objectArray1.length; i += 1) {
    const o = objectArray1[i].split(';');
    const tableItem = {
      id: o[0],
      name: o[1],
      measure: o[2],
      measure_period: o[3],
      type: o[4],
    };

    // eslint-disable-next-line no-await-in-loop
    await addTransaction(db, tableItem, 'Score');
  }

  const objectArray2 = textDepScore.split('\n');
  for (let i = 0; i < objectArray2.length; i += 1) {
    const o = objectArray2[i].split(';');
    const tableItem = {
      id: i + 1,
      id_department: o[0],
      id_indicator: o[1],
      planned: o[2],
      fact: o[3],
    };

    // eslint-disable-next-line no-await-in-loop
    await addTransaction(db, tableItem, 'ScoreDepartment');
  }
};

const createDatabase = async (textDep, textScore, textDepScore, nameDb, version = 1) => {
  let db = null;
  try {
    db = await init(nameDb, version);
  } catch (error) {
    console.error(error);
  }
  const lastVersion = localStorage.getItem(DATABASE_V_KEY);

  // eslint-disable-next-line eqeqeq
  if (lastVersion != db.version) {
    console.log('aa');
    fill(textDep, textScore, textDepScore, db);
    localStorage.setItem(DATABASE_V_KEY, db.version);
  }
  return db;
};

export default createDatabase;
