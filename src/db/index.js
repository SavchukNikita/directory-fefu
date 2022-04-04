import createDatabase from './createDb';
import dataDep from './dataDep.txt';
import dataScore from './dataScore.txt';
import dataDepScore from './dataDepScore.txt';

export default class Database {
  // eslint-disable-next-line class-methods-use-this
  async init(name, ver = 1) {
    this.db = await createDatabase(dataDep, dataScore, dataDepScore, name, ver);

    return this.db;
  }

  getAll() {
    return new Promise((resolve, reject) => {
      const store = this.db.transaction('Department', 'readonly').objectStore('Department');
      const request = store.getAll();
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  getById(id) {
    return new Promise((resolve, reject) => {
      const store = this.db.transaction('Department', 'readonly').objectStore('Department');
      const request = store.get(id);
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  async getByFilters(filters) {
    let res = await this.getAll();

    const fKeys = Object.keys(filters);

    fKeys.forEach((k) => {
      if (filters[k]) {
        res = res.filter((depart) => depart[k] === filters[k]);
      }
    });

    return res;
  }

  // eslint-disable-next-line class-methods-use-this
  onlyUnique(value, index, self) {
    return self.indexOf(value) === index && value !== '-';
  }

  async getLeads() {
    let res = await this.getAll();
    res = res.map((depart) => depart.lead);
    res = res.filter(this.onlyUnique);

    return res;
  }

  async getName() {
    let res = await this.getAll();
    res = res.map((depart) => depart.name);
    res = res.filter(this.onlyUnique);

    return res;
  }

  async getAddresses() {
    let res = await this.getAll();
    res = res.map((depart) => depart.address);
    res = res.filter(this.onlyUnique);

    return res;
  }

  async searchByName(name) {
    let res = await this.getAll();
    res = res.filter((depart) => depart.name.toLowerCase().indexOf(name.toLowerCase(), 0) >= 0);
    return res;
  }

  async getScoreById(id) {
    const allIndicators = await this.getAllIndicators();
    const indicatorsById = allIndicators.filter((el) => el.id_department === id);

    const res = [];

    for (let i = 0; i < indicatorsById.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const indicator = await this.getIndicatorById(indicatorsById[i].id_indicator);

      res.push({ ...indicatorsById[i], ...indicator });
    }

    return res;
  }

  getAllIndicators() {
    return new Promise((resolve, reject) => {
      const store = this.db.transaction('ScoreDepartment', 'readonly').objectStore('ScoreDepartment');
      const request = store.getAll();
      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  getIndicatorById(id) {
    return new Promise((resolve, reject) => {
      const store = this.db.transaction('Score', 'readonly').objectStore('Score');
      const request = store.get(id);
      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }
}
