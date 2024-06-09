// Convert to ES module syntax
import db from '../models/database.js';
import bcrypt from 'bcrypt';

// create main Model
const Kurumsal = db.kurumsal;

export const createkurumsal = async (req, res) => {
    try {
        const { name, surname, email, phoneNumber,department, sifre } = req.body;
        
        const kurumsalExist = await Kurumsal.findOne({ where: { email } });
        if (kurumsalExist) {
            return res.status(400).json({
                message: `Başarısız! Kurumsal Hesap, ${kurumsalExist.email} adresi ile zaten var!`
            });
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(sifre, saltRounds);
        const kurumsal = await Kurumsal.create({
            name,
            surname,
            email,
            phoneNumber,
            department,
            sifre : hashedPassword 
        });

        return res.status(201).json({
            message: "Başarılı! Kurumsal Hesap başarıyla oluşturuldu!",
            kurumsal: {
                name: kurumsal.name,
                surname: kurumsal.surname,
                email: kurumsal.email,
                phoneNumber: kurumsal.phoneNumber,
                department: kurumsal.department
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
export const getkurumsal = async (req, res) => {
    try {
        const email = req.body.email;
        const kurumsal = await Kurumsal.findOne({ where: { email } });
        if (!kurumsal) {
            return res.status(404).json({
                message: `Kurumsal Hesap bulunamadı: ${email}`
            });
        }
        return res.status(200).json({
            message: "Başarılı! Kurumsal Hesap bulundu.",
            kurumsal: {
                name: kurumsal.name,
                surname: kurumsal.surname,
                email: kurumsal.email,
                phoneNumber: kurumsal.phoneNumber,
                department: kurumsal.department
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
export const deletekurumsal = async (req, res) => {
    try {
        const { email, sifre } = req.body;
        const kurumsal = await Kurumsal.findOne({ where: { email } });
        if (!kurumsal) {
            return res.status(404).json({
                message: `Kurumsal Hesap bulunamadı: ${email}`
            });
        }
        const isPasswordMatch = await bcrypt.compare(sifre, kurumsal.sifre);
        if (!isPasswordMatch) {
            return res.status(401).json({
                message: 'Hatalı şifre'
            });
        }
        await kurumsal.destroy();
        return res.status(200).json({
            message: `Başarılı! Kurumsal Hesap (${email}) başarıyla silindi.`
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            title: "Hata!",
            message: "Sunucu hatası"
        });
    }
}
export const updatekurumsal = async (req, res) => {
    try {
        const email = req.query.email;
        const existingKurumsal = await Kurumsal.findOne({ where: { email} });

        if(!existingKurumsal){
            return res.status(404).json({
                message: "Kurumsal hesap bulunamadı."
            });
        }
        const existingKurumsalGuncel = await existingKurumsal.update(req.body,
            {
                where: { email: req.query.email }
            }
        )
         if (existingKurumsalGuncel == 0) {

            return res.status(404).json({
                message: "Güncelleme hatası!"
            });
        }
        return res.status(200).json({
            message: "Başarılı! Kurumsal hesap başarıyla güncellendi.",
            kurumsal: existingKurumsal
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};