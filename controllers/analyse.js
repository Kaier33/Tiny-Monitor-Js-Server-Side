const ErrorModel = require("../model/error");
const sequelize = require("../database/index");

const query_error_list = function ({
  p_id = "test",
  page = 1,
  page_size = 5,
  day = 14,
}) {
  return `
    SELECT SQL_CALC_FOUND_ROWS
	    id,
	    p_id,
	    error_id,
	    error_type,
      error_info,
	    exception_time
    FROM
	    error
    WHERE
	    FROM_UNIXTIME(exception_time / 1000, '%Y-%m-%d %H') > DATE_SUB(NOW(), INTERVAL ${day} DAY)
	    AND p_id = '${p_id}'
	    AND STATUS = 1
    ORDER BY
	    id DESC
	  LIMIT ${(page - 1) * page_size}, ${page_size};
  `;
};
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
    const { page_size = 5, page = 1, p_id = "test", day = 14 } = ctx.query;
    const list = await sequelize.query(
      query_error_list({ p_id, page, page_size, day }),
      {
        type: sequelize.QueryTypes.SELECT,
        raw: true,
        logging: false,
      }
    );
    const total = await sequelize.query("SELECT FOUND_ROWS()", {
      type: sequelize.QueryTypes.SELECT,
      raw: true,
      logging: false,
    });

    ctx.body = {
      code: 200,
      message: "ok",
      data: {
        list,
        page: page,
        page_size: page_size,
        total: total[0]['FOUND_ROWS()'],
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
