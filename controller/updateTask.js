const {pool} = require("../config/sqlConnection");
const ErrorHandler = require("../service/ErrorHandler");

module.exports = async function updateTask(req, res, next) {
    const { id } = req.params;
    const { title, status } = req.body;

    if (!id) {
        return next(new ErrorHandler(400, "id cannot be empty"));
    }

    if (!title && !status) {
        return next(new ErrorHandler(400, "Nothing to update"));
    }

    try {
        let fields = [];
        let values = [];

        if (title) {
            fields.push("title = ?");
            values.push(title);
        }

        if (status) {
            fields.push("status = ?");
            values.push(status);
        }

        values.push(id);

        const query = `UPDATE tasks SET ${fields.join(", ")} WHERE id = ?`;

        const [result] = await pool.query(query, values);

        console.log(result);

        if (result.affectedRows === 0) {
            return next(new ErrorHandler(404, "Task Not Found"));
        }

        res.status(200).json({
            success: true,
            message: "Task updated successfully"
        });

    } catch (err) {
        console.log(err.message);
        return next(new ErrorHandler(400, err.message));
    }
};