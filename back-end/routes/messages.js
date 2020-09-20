const router = require("express").Router();
const { catchErrors } = require("../Handller/errors");
const messageController = require("../Controller/messageContoller");

const auth = require("../Middleware/auth");

router.post("/msg", auth, catchErrors(messageController.message));

router.get("/allMsgs", auth, catchErrors(messageController.allMsgs));

 router.post("/reply/:id", auth, catchErrors(messageController.replies));

 router.get("/msg/:id", auth, catchErrors(messageController.getReplies));
   
router.delete("/deleteMsg/:id", auth, catchErrors(messageController.deleteMsg));
 
router.delete("/deleteMsg/:id", auth, catchErrors(messageController.deleteMsg));

router.post("/updateMsg/:id", auth, catchErrors(messageController.updateMsg));

module.exports = router;