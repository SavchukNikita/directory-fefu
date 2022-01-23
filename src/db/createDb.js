const DATABASE_V_KEY = 'database__v';

const init = (nameDb, version = 1) => new Promise((resolve, reject) => {
  const openRequest = indexedDB.open(nameDb, version);

  openRequest.onupgradeneeded = () => {
    const db = openRequest.result;
    if (!db.objectStoreNames.contains('Department')) {
      db.createObjectStore('Department', { keyPath: 'id' });
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

const addTransaction = (db, element) => new Promise((resolve, reject) => {
  const transaction = db.transaction('Department', 'readwrite');
  const department = transaction.objectStore('Department');
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

const fill = async (text, db) => {
  const objectArray = text.split('\n');

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
    await addTransaction(db, tableItem);
  }
};

const createDatabase = async (text, nameDb, version = 1) => {
  let db = null;
  try {
    db = await init(nameDb, version);
  } catch (error) {
    console.error(error);
  }

  const lastVersion = localStorage.getItem(DATABASE_V_KEY);

  // eslint-disable-next-line eqeqeq
  if (lastVersion != db.version) {
    fill(text, db);
    localStorage.setItem(DATABASE_V_KEY, db.version);
  }

  return db;
};

export default createDatabase;
