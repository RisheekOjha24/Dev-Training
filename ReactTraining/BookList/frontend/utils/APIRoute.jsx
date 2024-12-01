//base URL
export const host = "http://localhost:4500";

// auth routes
export const signin = `${host}/auth/signin`;
export const signup=`${host}/auth/signup`;

// cart routes
export const getCartItem=`${host}/cart/getCartItem`
export const cartAddItem=`${host}/cart/addItem`;
export const cartRemoveItem=`${host}/cart/removeItem`;
export const cartUpdateItem=`${host}/cart/updateItem`;
export const cartBulkRemoveItem = `${host}/cart/bulkRemoveItem`;
