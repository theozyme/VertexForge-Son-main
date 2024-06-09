import db from '../models/database.js';

const List = db.list;

// Liste oluşturma
export const createList = async (req, res) => {
    try {
        const { boardId, title } = req.body;
        const list = await List.create({ boardId, title });
        return res.status(201).json({
            message: "Başarılı! Liste başarıyla oluşturuldu!",
            list
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            title: "Hata!",
            message: "Sunucu hatası"
        });
    }
};

// Liste alma
export const getList = async (req, res) => {
    try {
        const { id } = req.params;
        const list = await List.findOne({ where: { id } });
        if (!list) {
            return res.status(404).json({ message: 'Başarısız!, Liste bulunamadı.' });
        }
        res.status(200).json({
            message: "Başarılı! Liste bulundu!",
            list
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Liste silme
export const deleteList = async (req, res) => {
    try {
        const { id } = req.params;
        const list = await List.findOne({ where: { id } });
        if (!list) {
            return res.status(404).json({
                message: `Liste bulunamadı: ${id}`
            });
        }
        await list.destroy();
        return res.status(200).json({
            message: `Başarılı! Liste (${id}) başarıyla silindi.`
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            title: "Hata!",
            message: "Sunucu hatası"
        });
    }
};

// Liste güncelleme
export const updateList = async (req, res) => {
    try {
        const { id } = req.params;
        const existingList = await List.findOne({ where: { id } });

        if (!existingList) {
            return res.status(404).json({
                message: "Liste bulunamadı."
            });
        }

        const updatedList = await existingList.update(req.body);

        return res.status(200).json({
            message: "Başarılı! Liste başarıyla güncellendi.",
            list: updatedList
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
