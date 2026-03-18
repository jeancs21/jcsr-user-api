import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, '../data/db.json');

const readData = () => {
    try {
        const data = fs.readFileSync(dbPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
        return { users: [] };
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.log(error);
    }
};

const normalizeStr = (str) => {
    return str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : "";
};

export const userService = {
    getAll: (filters) => {
        const data = readData();
        const { search, city, company } = filters;
        let filteredUsers = data.users;

        if (search) {
            const searchText = normalizeStr(search);
            filteredUsers = filteredUsers.filter(user =>
                normalizeStr(user.name).includes(searchText) ||
                normalizeStr(user.email).includes(searchText)
            );
        }

        if (city) {
            const cityFilter = normalizeStr(city);
            filteredUsers = filteredUsers.filter(user =>
                normalizeStr(user.city) === cityFilter
            );
        }

        if (company) {
            const companyFilter = normalizeStr(company);
            filteredUsers = filteredUsers.filter(user =>
                normalizeStr(user.company) === companyFilter
            );
        }

        return filteredUsers;
    },

    getById: (id) => {
        const data = readData();
        return data.users.find(user => user.id === id);
    },

    create: (userData) => {
        const data = readData();
        const newUser = {
            id: data.users.length > 0 ? Math.max(...data.users.map(u => u.id)) + 1 : 1,
            ...userData
        };
        data.users.push(newUser);
        writeData(data);
        return newUser;
    }
};
