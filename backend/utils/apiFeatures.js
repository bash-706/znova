class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  // 1. Basic Filtering
  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['sort', 'limit', 'page', 'fields', 'search'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 2. Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // Building Query
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    // 3. Sorting Query
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limit() {
    // 4. Limiting Fields
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    // 5. Pagination
    const page = this.queryString.page || 1;
    const limit = this.queryString.limit || 12;
    const skip = (page - 1) * limit;
    this.query.skip(skip).limit(limit);

    // if (req.query.page) {
    //   const numDocs = await Service.countDocuments();
    //   if (skip >= numDocs) throw new Error('This page does not exist!');
    // }
    return this;
  }

  search() {
    const where = {};
    if (this.queryString.search) {
      where.title = { $regex: this.queryString.search, $options: 'i' };
      this.query = this.query.find(where);
    }
    return this;
  }
}

module.exports = APIFeatures;
