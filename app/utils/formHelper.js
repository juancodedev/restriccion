import {compose, all, equal, values, both, isEmpty, not, isNil, ifElse, always} from 'ramda';

export const allTrue = compose( all(equal(true)), values );
const exists = both(compose(not, isNil), compose(not, isEmpty));
const objExists = compose(exists, values);
export const allValid = both(objExists, allTrue );
export const getValidOrInvalid = ifElse( equal(true), always('valid'), always('invalid') );
export const getValidatorClass = ifElse( exists, getValidOrInvalid, always(null) );
