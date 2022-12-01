export const batchDocuments = async (keys, models) => {
  const files = await models.File.findAll({
    where: {
      id: {
        $in: keys,
      },
    },
  });

  return keys.map((key) => files.find((file) => file.id === key));
};
