import createDatabase from './createDb';
import data from './data.txt';

const init = async (name, ver = 1) => await createDatabase(data, name, ver);

export default init;
