import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models/database.js';

const Bireysel = db.bireysel;
const Kurumsal = db.kurumsal;

export const register = async (req, res) => {
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

export const registerkurumsal = async (req, res) => {
    try {
        const { name, surname, email, phoneNumber, department, sifre } = req.body;
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
            sifre: hashedPassword 
        });
        return res.status(201).json({
            message: "Başarılı! Kurumsal Hesap başarıyla oluşturuldu!",
            kurumsal: {
                name: kurumsal.name,
                surname: kurumsal.surname,
                email: kurumsal.email,
                phoneNumber: kurumsal.phoneNumber,
                department: kurumsal.department,
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

export const login = async (req, res) => {
    try {
        const { email, sifre } = req.body;

        // Bireysel kullanıcıyı kontrol et
        const bireysel = await Bireysel.findOne({ where: { email } });
        if (bireysel) {
            // Bireysel kullanıcı bulunduysa şifresini kontrol et
            const isPasswordMatch = await bcrypt.compare(sifre, bireysel.sifre);
            if (isPasswordMatch) {
                // Şifre doğruysa token oluştur
                const token = jwt.sign({ id: bireysel.id, email: bireysel.email, userType: 'Bireysel' }, process.env.JWT_SECRET, { expiresIn: '1h' });
                return res.status(200).json({
                    message: 'Başarılı! Giriş başarılı',
                    token
                });
            } else {
                return res.status(401).json({
                    message: 'Hatalı şifre'
                });
            }
        }

        // Kurumsal kullanıcıyı kontrol et
        const kurumsal = await Kurumsal.findOne({ where: { email } });
        if (kurumsal) {
            // Kurumsal kullanıcı bulunduysa şifresini kontrol et
            const isPasswordMatch = await bcrypt.compare(sifre, kurumsal.sifre);
            if (isPasswordMatch) {
                // Şifre doğruysa token oluştur
                const token = jwt.sign({ id: kurumsal.id, email: kurumsal.email, userType: 'Kurumsal' }, process.env.JWT_SECRET, { expiresIn: '1h' });
                return res.status(200).json({
                    message: 'Başarılı! Giriş başarılı',
                    token
                });
            } else {
                return res.status(401).json({
                    message: 'Hatalı şifre'
                });
            }
        }

        // Ne bireysel ne de kurumsal kullanıcı bulunamadı
        return res.status(404).json({
            message: `Başarısız! Hesap bulunamadı: ${email}`
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            title: "Hata!",
            message: "Sunucu hatası"
        });
    }
}

export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: 'Token gerekli' });
    }
    try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Geçersiz token' });
    }
}
