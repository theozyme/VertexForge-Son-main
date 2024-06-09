export default (sequelize, DataTypes) => {
    const Task = sequelize.define("Task", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        taskStatuses: {
            type: DataTypes.ENUM('Yapılacaklar', 'Şu anda yapılanlar', 'Tamamlananlar'),
            allowNull: false
        },
        listId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Lists',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        }
    });

    Task.associate = (models) => {
        Task.belongsTo(models.list, {
            foreignKey: 'listId',
            as: 'list'
        });
    };

    return Task;
}
