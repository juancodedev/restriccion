/**
 * @module CRUD
 * @description Basic Mongoose CRUD Operations
 */


/**
 * Creates a record
 * @param {object} Model the Mongoose Model to work on
 * @param {object} data an object according to proper Schema
 * @return {object} Promise containing the saved document
 */
export function create(Model, data) {
  return new Promise((resolve, reject) => {
    const document = new Model(data);

    document.save((err, doc) => {
      if (err) { reject(err); }
      resolve(doc);
    });
  });
}


/**
 * Creates or Updates a record
 * @param {object} Model the Mongoose Model to work on
 * @param {object} query an object containing the query to search for existing documents. ie: {'_id': someId}
 * @param {object} data an object according to proper Schema
 * @return {object} Promise containing the saved document
 */
export function upsert(Model, query, data) {
  return new Promise((resolve, reject) => {
    const document = new Model(data);

    Model
      .findOneAndUpdate(query, document, {upsert: true}, (err, doc) => {
        if (err) { reject(err); }
        resolve(doc || document);
      });
  });
}
