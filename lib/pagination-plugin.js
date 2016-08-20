module.exports = function(schema) {

  schema.query.paginate = function(query, defaultCount) {
    if (defaultCount === undefined) {
      defaultCount = 5;
    }

    var limit = +query.count;
    if (isNaN(limit) || limit > defaultCount) {
      limit = defaultCount;
    }

    var skip = +query.offset;
    if (isNaN(skip)) {
      skip = 0;
    }

    return this.limit(limit).skip(skip);
  }

};
