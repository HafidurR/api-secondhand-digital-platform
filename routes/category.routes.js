const router = require('express').Router();
const categooryRoute = require('../controller/categoryController');

router.get('/', categooryRoute.getAll);
router.post('/', categooryRoute.create);
router.put('/:id', categooryRoute.update);
router.delete('/:id', categooryRoute.destroy);

module.exports = router;