import db from '../models/database.js';

const Task = db.task;

// Görev oluşturma
export const createTask = async (req, res) => {
    try {
        const { listId, title, description, taskStatuses } = req.body;
        const task = await Task.create({ listId, title, description, taskStatuses });
        return res.status(201).json({
            message: "Başarılı! Görev başarıyla oluşturuldu!",
            task
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            title: "Hata!",
            message: "Sunucu hatası"
        });
    }
};

// Görev alma
export const getTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findOne({ where: { id } });
        if (!task) {
            return res.status(404).json({ message: 'Başarısız!, Görev bulunamadı.' });
        }
        res.status(200).json({
            message: "Başarılı! Görev bulundu!",
            task
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Görev silme
export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findOne({ where: { id } });
        if (!task) {
            return res.status(404).json({
                message: `Görev bulunamadı: ${id}`
            });
        }
        await task.destroy();
        return res.status(200).json({
            message: `Başarılı! Görev (${id}) başarıyla silindi.`
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            title: "Hata!",
            message: "Sunucu hatası"
        });
    }
};

// Görev güncelleme
export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const existingTask = await Task.findOne({ where: { id } });

        if (!existingTask) {
            return res.status(404).json({
                message: "Görev bulunamadı."
            });
        }

        const updatedTask = await existingTask.update(req.body);

        return res.status(200).json({
            message: "Başarılı! Görev başarıyla güncellendi.",
            task: updatedTask
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
