const Notification = require("../../../models/notification");

const notificationController = {
    getAll: async (req, res) => {
        try {
            let id = req.params.id
            const notifications = await Notification.find({idReceiver: id}).populate('idSender').populate('idReceiver');
            res.status(200).send(notifications);
        } catch (err) {
            res.status(404).send(err);
        }
    },
    add: async (data) => {
        try {
            const notification = {
                idSender: data.idSender,
                idReceiver: data.idReceiver,
                message: data.message
            }
            await Notification.create(notification);
            res.status(200).send({ success: true });
        } catch (err) {
            res.status(500).send({
                success: false,
                error: err.message
            });
        }
    },
};
module.exports = notificationController;
