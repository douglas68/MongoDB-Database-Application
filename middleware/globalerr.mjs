export default (err, req, res, next1) => {
  res.status(500).json({ msg: `❌ Error - ${err.message}` });
}