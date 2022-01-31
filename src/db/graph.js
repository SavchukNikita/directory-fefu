export default async function getChildren(id, db) {
  let firstGeneration = null;
  firstGeneration = await db.getByFilters({ dependence: id });
  console.log('firstGeneration', firstGeneration);
  const data = [];
  return data;
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
