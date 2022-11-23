import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CLEAR_CART,
    SET_DISCOUNT,
    REMOVE_DISCOUNT,
    SET_SHIPMENT_FEES,
    ENABLE_DIRECT_PURCHASE_MODE,
    DISABLE_DIRECT_PURCHASE_MODE,
    PREPARE_CART,
    SET_CART_ID,
    SET_CART_NOTES,
} from './../actions/types';
import {sumBy, map, filter, round, random} from 'lodash';
import moment from 'moment';

const initialState = {
    total: 0,
    netTotal: 0,
    discount: 0,
    totalWeight: 0,
    shipmentFees: 0,
    totalItems: 0,
    directPurchaseMode: false,
    multiCartMerchant: true,
    receiveFromShop: false,
    shipmentCountry: {},
    shipmentGovernate: {},
    items: [],
    merchants: [],
    cartId: random(99, 999),
    notes: '',
    date_created: moment().format(),
};
export default function (cart = initialState, action) {
    let currentTotal;
    let currentDiscount;
    let currentShipmentFees;
    let currentNetTotal;
    let currentTotalItems;
    let currentTotalWeight;
    let shipmentCountry;
    let shipmentGovernate;
    let weight;
    let isValid;
    switch (action.type) {
        case PREPARE_CART:
            currentShipmentFees = cart.shipmentFees;
            currentDiscount = cart.discount;
            currentTotalItems = parseInt(
                sumBy(
                    map(cart.items, (item) =>
                        item.cart_id === action.payload.cart_id
                            ? action.payload
                            : item
                    ),
                    'qty'
                )
            );
            currentTotal = round(
                parseFloat(sumBy(cart.items, 'totalPrice')),
                2
            );
            currentNetTotal = round(
                parseFloat(
                    sumBy(cart.items, 'totalPrice') +
                        currentShipmentFees -
                        currentDiscount
                ),
                2
            );
            weight = round(parseFloat(sumBy(cart.items, 'weight')), 2);
            currentTotalWeight = parseFloat(weight) ? weight : 0;
            isValid = moment(cart.date_created).isAfter(
                moment().subtract('1', 'hour').format()
            );
            return {
                ...cart,
                items: isValid ? cart.items : [],
                date_created: isValid ? cart.date_created : moment().format(),
                merchants: isValid ? cart.merchants : [],
                multiCartMerchant: action.payload.multiCartMerchant,
                shipmentCountry: action.payload.shipmentCountry,
                shipmentFees: action.payload.shipmentFees,
                total: isValid ? currentTotal : 0,
                netTotal: isValid ? currentNetTotal : 0,
                totalItems: isValid ? currentTotalItems : 0,
                totalWeight: isValid ? currentTotalWeight : 0,
            };
        case SET_CART_ID:
            return {
                ...cart,
                cartId: action.payload,
            };
        case ADD_TO_CART: // item
            currentShipmentFees = cart.shipmentFees;
            currentDiscount = cart.discount;
            currentTotalItems = parseInt(
                sumBy(
                    map(action.payload.items, (item) =>
                        item.cart_id === action.payload.cart_id
                            ? action.payload
                            : item
                    ),
                    'qty'
                )
            );
            currentTotal = round(
                parseFloat(sumBy(action.payload.items, 'totalPrice')),
                2
            );
            currentNetTotal = round(
                parseFloat(
                    sumBy(action.payload.items, 'totalPrice') +
                        currentShipmentFees -
                        currentDiscount
                ),
                2
            );
            weight = round(parseFloat(sumBy(cart.items, 'weight')), 2);
            currentTotalWeight = parseFloat(weight) ? weight : 0;
            return {
                ...cart,
                items: action.payload.items,
                total: currentTotal,
                netTotal: currentNetTotal,
                totalItems: currentTotalItems,
                merchants: action.payload.merchants,
                totalWeight: currentTotalWeight,
                date_created: moment().format(),
            };
        case REMOVE_FROM_CART: // only cart_id
            const items = filter(
                cart.items,
                (item) => item.cart_id !== action.payload
            );
            currentTotal = round(parseFloat(sumBy(items, 'totalPrice')), 2);
            currentNetTotal = round(parseFloat(sumBy(items, 'totalPrice')), 2);
            currentTotalItems = parseInt(
                sumBy(
                    map(items, (item) =>
                        item.cart_id === action.payload.cart_id
                            ? action.payload
                            : item
                    ),
                    'qty'
                )
            );
            currentTotalWeight = round(
                parseFloat(sumBy(cart.items, 'weight')),
                2
            );
            return {
                ...cart,
                items: filter(items, (item) => item.cart_id !== action.payload),
                total: currentTotal,
                netTotal: currentNetTotal,
                totalItems: currentTotalItems,
                shipmentFees: 0,
                discount: 0,
                totalWeight: currentTotalWeight,
                merchants: filter(items, (i) => i.merchant_id),
            };
        case SET_DISCOUNT: // only discount value
            currentTotal = cart.total;
            currentShipmentFees = cart.shipmentFees;
            currentDiscount = parseFloat(
                action.payload.is_percentage
                    ? currentTotal * (action.payload.value / 100)
                    : action.payload.value
            );
            currentNetTotal = round(
                parseFloat(
                    currentTotal - currentDiscount + currentShipmentFees
                ),
                2
            );
            return {
                ...cart,
                discount: currentDiscount,
                netTotal: currentNetTotal,
            };
        case REMOVE_DISCOUNT: // only discount value
            currentTotal = cart.total;
            currentShipmentFees = cart.shipmentFees;
            currentDiscount = 0;
            currentNetTotal = round(
                parseFloat(
                    currentTotal - currentDiscount + currentShipmentFees
                ),
                2
            );
            return {
                ...cart,
                discount: currentDiscount,
                total: currentTotal,
                netTotal: currentNetTotal,
            };
        case SET_SHIPMENT_FEES: // only shipmentFees value
            currentDiscount = cart.discount;
            currentTotal = round(
                parseFloat(sumBy(cart.items, 'totalPrice')),
                2
            );
            shipmentCountry = action.payload.shipmentCountry;
            shipmentGovernate = action.payload.shipmentGovernate;
            currentShipmentFees = action.payload.shipmentFees;
            currentNetTotal = round(
                parseFloat(
                    currentTotal - currentDiscount + currentShipmentFees
                ),
                2
            );
            return {
                ...cart,
                netTotal: currentNetTotal,
                shipmentFees: currentShipmentFees,
                receiveFromShop: action.payload.receiveFromShop,
                shipmentCountry,
                shipmentGovernate,
            };
        case ENABLE_DIRECT_PURCHASE_MODE:
            return {
                ...cart,
                items: [action.payload],
                directPurchaseMode: true,
                total: action.payload.price,
                netTotal: action.payload.price,
                totalItems: 1,
            };
        case SET_CART_NOTES:
            return {
                ...cart,
                notes: action.payload,
            };
        case DISABLE_DIRECT_PURCHASE_MODE:
            return initialState;
        case CLEAR_CART:
            return {
                ...initialState,
                date_created: moment().format(),
            };
        default:
            return cart;
    }
}
