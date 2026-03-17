import express from 'express';
import fs from 'fs'; //permite trabajar con file systems
import bodyParser from 'body-parser'; //middleware para parsear el body de las solicitudes POST y PUT
import cors from 'cors'; //middleware para habilitar CORS (Cross-Origin Resource Sharing)

const app = express();
app.use(bodyParser.json());

app.use(cors());

const readData = () => {
    try {
        const data = fs.readFileSync('./db.json');
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync("./db.json", JSON.stringify(data));
    } catch (error) {
        console.log(error);
    }
};

const normalizeStr = (str) => {
    return str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : "";
};

app.get('/', (req, res) => {
    res.send("Welcome")
});

app.get('/users', (req, res) => {
    const data = readData();
    const { search, city, company } = req.query;

    if (search) {
        const searchText = normalizeStr(search);
        const filteredUsers = data.users.filter(user =>
            normalizeStr(user.name).includes(searchText) ||
            normalizeStr(user.email).includes(searchText)
        );
        return res.json(filteredUsers);
    }

    if (city) {
        const cityFilter = normalizeStr(city);
        const filteredUsers = data.users.filter(user =>
            normalizeStr(user.city).includes(cityFilter)
        );
        return res.json(filteredUsers);
    }

    if (company) {
        const companyFilter = normalizeStr(company);
        const filteredUsers = data.users.filter(user =>
            normalizeStr(user.company).includes(companyFilter)
        );
        return res.json(filteredUsers);
    }
    res.json(data.users);
});

app.get('/users/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const user = data.users.find(user => user.id === id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

app.post('/users', (req, res) => {
    const data = readData();
    const body = req.body;
    const newUser = {
        id: data.users.length + 1,
        ...body
    };
    data.users.push(newUser);
    writeData(data);
    res.status(201).json(newUser);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});