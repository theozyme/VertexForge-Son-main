import db from '../models/database.js';
import bcrypt from 'bcrypt';

const Bireysel = db.bireysel;

export const createbireysel = async (req, res) => {
    try {
        const { name, surname, email, phoneNumber, occupation, sifre } = req.body;
        const bireyselExist = await Bireysel.findOne({ where: { email } });
        if (bireyselExist) {
            return res.status(400).json({
                message: `Başarısız! Bireysel Hesap, ${bireyselExist.email} adresi ile zaten var!`
            });
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(sifre, saltRounds);
        const bireysel = await Bireysel.create({
            name,
            surname,
            email,
            phoneNumber,
            occupation,
            sifre: hashedPassword 
        });
        return res.status(201).json({
            message: "Başarılı! Bireysel Hesap başarıyla oluşturuldu!",
            bireysel: {
                name: bireysel.name,
                surname: bireysel.surname,
                email: bireysel.email,
                phoneNumber: bireysel.phoneNumber,
                occupation: bireysel.occupation,
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            title: "Hata!",
            message: "Sunucu hatası"
        });
    }
}

export const getbireysel = async (req, res) => {
    try {
        const email = req.body.email;
        const bireysel = await Bireysel.findOne({ where: { email } });
        if (!bireysel) {
            return res.status(404).json({ message: 'Başarısız!, Bireysel Hesap bulunamadı.' });
        }
        res.status(200).json({
            message: "Başarılı! Bireysel Hesap bulundu!",
            bireysel: bireysel
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const deletebireysel = async (req, res) => {
    try {
        const { email, sifre } = req.body;
        const bireysel = await Bireysel.findOne({ where: { email } });
        if (!bireysel) {
            return res.status(404).json({
                message: `Bireysel Hesap bulunamadı: ${email}`
            });
        }
        const isPasswordMatch = await bcrypt.compare(sifre, bireysel.sifre);
        if (!isPasswordMatch) {
            return res.status(401).json({
                message: 'Hatalı şifre'
            });
        }
        await bireysel.destroy();
        return res.status(200).json({
            message: `Başarılı! Bireysel Hesap (${email}) başarıyla silindi.`
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            title: "Hata!",
            message: "Sunucu hatası"
        });
    }
}

export const updatebireysel = async (req, res) => {
    try {
        const { email } = req.query;
        const existingbireysel = await Bireysel.findOne({ where: { email } });

        if (!existingbireysel) {
            return res.status(404).json({
                message: "Bireysel hesap bulunamadı."
            });
        }

        const updatedbireysel = await existingbireysel.update(req.body);

        if (!updatedbireysel) {
            return res.status(404).json({
                message: "Güncelleme hatası!"
            });
        }

        return res.status(200).json({
            message: "Başarılı! Bireysel hesap başarıyla güncellendi.",
            bireysel: updatedbireysel
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
