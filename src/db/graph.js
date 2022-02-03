const children = [];
let data;

export default async function getGraphData(id, db) {
  data = [];
  let root = null;
  root = await db.getById(id);
  data.push({ id: root.id, name: root.name });
  console.log('data -- ', data);
  // eslint-disable-next-line no-use-before-define
  getChildren(id, db);
  // data.push(
  //   { id: 1001, pid: 180, name: 'Rand' },
  //   { id: 1002, pid: 180, name: 'Rand' },
  //   { id: 1003, pid: 180, name: 'Rand' },
  //   { id: 1004, pid: 180, name: 'Rand' },
  //   { id: 1005, pid: 180, name: 'Rand' },
  //   { id: 1006, pid: 180, name: 'Rand' },
  //   { id: 1007, pid: 180, name: 'Rand' },
  // );
  return data;
}
async function getChildren(id, db) {
  children[id] = await db.getByFilters({ dependence: id });
  if (children[id].length !== 0) {
    console.log(id, ' -- ', children[id]);
  }
  children[id].forEach((el) => {
    data.push({ id: el.id, pid: el.dependence, name: el.name });
    getChildren(el.id, db);
  });
}

// 1) Получить детей
// 2) Получить детей этих детей ↑
// 3) Сформировать массив по образцу

// data: [
//   { id: 1, name: "Amber McKenzie" }, // первое поколение
//   { id: 2, pid: 1, name: "X" },
//   { id: 3, pid: 1, name: "Y" },
//   { id: 4, pid: 3, name: "z" },
//   { id: 5, pid: 4, name: "I" },
// ]
