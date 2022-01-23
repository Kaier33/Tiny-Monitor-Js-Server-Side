const ErrorModel = require("../model/error");

class Analyse {
  static async countAll(ctx) {
    try {
      const result = await ErrorModel.findAndCountAll();
      ctx.body = {
        message: "ok",
        data: {
          list: result,
        },
      };
    } catch (error) {
      console.log("error::", error);
    }
  }
  static async errorList(ctx) {
    const { page_size = 5, page = 1, p_id = "test" } = ctx.query;
    const result = await ErrorModel.findAndCountAll({
      attributes: [
        "id",
        "p_id",
        "error_type",
        "error_id",
        "user_id",
        "environment",
        "created_at",
      ],
      where: {
        p_id: p_id,
        status: 1,
      },
      order: [["id", "desc"]],
      offset: (page - 1) * page_size,
      limit: Number(page_size),
    });

    ctx.body = {
      code: 200,
      message: "ok",
      data: {
        list: result.rows.map((ele) => ele.dataValues),
        page: page,
        page_size: page_size,
        total: result.count,
      },
    };
  }
  static async errorDetail(ctx) {
    const { id } = ctx.request.params;
    const result = await ErrorModel.findOne({
      where: {
        id: id,
      },
    });
    ctx.body = {
      code: 200,
      data: result.dataValues,
      message: "ok",
    };
  }
}

module.exports = Analyse;
