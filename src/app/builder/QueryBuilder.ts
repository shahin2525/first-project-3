import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  constructor(queryModel: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = queryModel;

    this.query = query;
  }
  //   search
  search(searchAbleFields: string[]) {
    const searchTerm = this?.query?.searchTerm || '';
    // if (this?.query?.searchTerm) {
    //   this.modelQuery = this.modelQuery.find({
    //     $or: searchAbleFields.map((field) => ({
    //       [field]: { $regex: searchTerm, $options: 'i' },
    //     })),
    //   });
    // }
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchAbleFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
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
  // sorting
  sorting() {
    const sort =
      (this?.query?.sort as string)?.split(',')?.join(' ') || 'createdAt';

    this.modelQuery = this.modelQuery.sort(sort as string);
    return this;
  }

  // limit and paginate

  paginate() {
    // check limit
    const limit = this?.query?.limit || 10;
    const page = this?.query?.page || 1;
    const skip = (Number(page) - 1) * Number(limit) || 0;

    // if (query?.limit) {
    //   limit = Number(query?.limit);
    // }

    // if (query?.page) {
    //   page = Number(query?.page);
    //   skip = (page - 1) * limit;
    // }
    // paginated Query

    this.modelQuery = this.modelQuery.skip(skip).limit(limit as number);

    // // limit query
    // const limitQuery = paginateQuery.limit(limit);
    return this;
  }
  // field limiting
  fieldsLimiting() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';

    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}

export default QueryBuilder;
