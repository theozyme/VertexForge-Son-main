// 'use strict'; // Bu dosyada ES6 standartlarına göre kod yazılacağını belirtir.

// kurumsal modeli tanımlanıyor. Bu model, veritabanında kurumsal tablosunu temsil edecek. Aynı zamanda bir class gibi kullanılabilecek.
export default (sequelize, DataTypes) => {

  const Kurumsal = sequelize.define("kurumsal", {
      // Model alanları ve özellikleri tanımlanıyor.
      name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              notEmpty: true
          }
          // name alanı, STRING türünde ve boş bırakılamaz (allowNull: false) olarak tanımlanıyor. Ayrıca bu alanda boş bir değer kabul edilmiyor (notEmpty: true).
      },
      surname: {
          type: DataTypes.STRING, // Surname string olmalı.
          allowNull: false,
          validate: {
              notEmpty: true
          }
      },
      email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true, // Her email adresi biricik olmalı.
          validate: {
              notEmpty: true,
              isEmail: true // Email formatında olmalı.
          }
      },
      phoneNumber: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              notEmpty: true,
              isNumeric: true, // Telefon numarası sayısal olmalı.
              len: [10, 15] // Telefon numarasının minimum 10, maksimum 15 karakter olması gerekir.
          }
      },
      sifre: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              notEmpty: true,
              len: [6, 255] // Şifrenin minimum 6, maksimum 20 karakter olması gerekir.
          }
      },
      department: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              notEmpty: true
          }
      }
  },
  {
      timestamps: false,
      //createdAt: 'created_at',//Bir kaydın oluşturulduğu tarihi ve saati tutar.
      //updatedAt: 'updated_at'//Bir kaydın en son güncellendiği tarihi ve saati tutar.
  });

  // Oluşturulan model return ediliyor.
  return Kurumsal;
}
