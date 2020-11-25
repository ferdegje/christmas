var Meta = require('html-metadata-parser');

export default async function me(req, res) {
  if (typeof req.query.url != 'string' || req.query.url === '') {
    res.status(500).end("Url must be a non empty string");
    return
  }
  try {

    Meta.parser(req.query.url, function (err, result) {
      var retValue = {
        raw: result,
        url: req.query.url
      }
      if (result.meta.description) {
        retValue.description = result.meta.description
      }
      if (result.og.description) {
        retValue.description = result.og.description
      }
      if (result.og.image) {
        retValue.image = result.og.image
      }
      if (result.meta.title) {
        retValue.title = result.meta.title
      }
      if (result.og.title) {
        retValue.title = result.og.title
      }
        res.status(200).end(JSON.stringify(retValue, null, 2));
    });

  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}
