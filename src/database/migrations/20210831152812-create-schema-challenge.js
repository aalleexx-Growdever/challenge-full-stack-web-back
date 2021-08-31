module.exports = {
  up: async queryInterface => {
    await queryInterface.createSchema('challenge');
  },

  down: async queryInterface => {
    await queryInterface.dropSchema('challenge');
  },
};
