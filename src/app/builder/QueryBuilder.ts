import { Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  constructor(queryModel: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = queryModel;

    this.query = query;
  }
  //   search
  search(searchAbleFields: string[]) {
    //  let searchTerm = '';
    if (this?.query?.searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchAbleFields.map((field) => ({
          [field]: { $regex: searchTerm, $options: 'i' },
        })),
      });
    }

    return this;
  }

  //   filtering

  filterQuery() {
    const queryObj = { ...this?.query };
    const excludes = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

    excludes.forEach((el) => delete queryObj[el]);
    this.modelQuery = this?.modelQuery?.find(queryObj);
    return this;
  }
}

export default QueryBuilder;
