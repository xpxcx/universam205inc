'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Создаем ENUM тип, если он еще не существует
    await queryInterface.sequelize.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_Users_role') THEN
          CREATE TYPE "enum_Users_role" AS ENUM ('user', 'admin');
        END IF;
      END
      $$;
    `);

    // Добавляем колонку role, если она еще не существует
    const table = await queryInterface.describeTable('Users');
    if (!table.role) {
      await queryInterface.addColumn('Users', 'role', {
        type: Sequelize.ENUM('user', 'admin'),
        defaultValue: 'user',
        allowNull: false
      });
    }

    // Обновляем существующие записи: если isAdmin = true, то role = 'admin'
    await queryInterface.sequelize.query(`
      UPDATE "Users"
      SET role = 'admin'
      WHERE "isAdmin" = true;
    `);
  },

  async down (queryInterface, Sequelize) {
    // Удаляем колонку role
    await queryInterface.removeColumn('Users', 'role');

    // Удаляем ENUM тип
    await queryInterface.sequelize.query(`
      DROP TYPE IF EXISTS "enum_Users_role";
    `);
  }
};
