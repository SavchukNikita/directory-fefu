let root = null;
const data = [];
const children = [];

export default async function getGraphData(id, db) {
  root = await db.getById(id);
  data.push({ id: root.id, name: root.name });
  // eslint-disable-next-line no-use-before-define
  getChildren(id, db);
  return data;
}
async function getChildren(id, db) {
  children[id] = await db.getByFilters({ dependence: id });
  // console.log(children[id], id);
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
