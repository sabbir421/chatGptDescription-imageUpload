exports.check = async ctx => {
  try {
    ctx.status = 200;
    ctx.body = { message: "Shehab the great" };
  } catch (error) {
    throw error;
  }
};
