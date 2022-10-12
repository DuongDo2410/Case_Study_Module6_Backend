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
    add: async (data, message) => {
        try {
            const notification = {
                idSender: data.idRenter,
                idReceiver: data.idReceiver,
                message: message
            }
            await Notification.create(notification);
        } catch (err) {
            console.log(err);
        }
    },
};
module.exports = notificationController;
