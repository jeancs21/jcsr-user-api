import { userService } from '../services/userService.js';

export const getAllUsers = (req, res) => {
    try {
        const users = userService.getAll(req.query);
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener usuarios" });
    }
};

export const getUserById = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const user = userService.getById(id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el usuario" });
    }
};

export const createUser = (req, res) => {
    try {
        const newUser = userService.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el usuario" });
    }
};

export const updateUser = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const updatedUser = userService.update(id, req.body);
        if (updatedUser) {
            res.json(updatedUser);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el usuario" });
    }
};

export const deleteUser = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const deleted = userService.delete(id);
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el usuario" });
    }
};
