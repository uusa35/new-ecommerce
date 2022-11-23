/**
 * Created by usamaahmed on 9/25/17.
 */
import React from 'react';
import _ from 'lodash';
// import geolib, {getDistance} from 'geolib';
import storage from 'redux-persist/lib/storage';

export const convertNumberToEnglish = (n) => {
    return n.replace(
        /[\u0660-\u0669\u06f0-\u06f9]/g,
        (c) => c.charCodeAt(0) & 0xf
    );
};

export function setLang(lang) {
    return storage.setItem('lang', lang);
}

export async function getLang() {
    return await storage.getItem('lang');
}

export function otherLang(lang) {
    return lang == 'en' ? 'ar' : 'en';
}

export function checkImage(img) {
    if (_.has(img, 'path')) {
        return !_.isUndefined(img.path) && !_.isNull(img.path) ? true : false;
    } else {
        return false;
    }
}

export function getImageExtension(img) {
    return _.has(img, 'filename')
        ? img.filename.substring(img.filename.lastIndexOf('.') + 1)
        : img.mime;
}

export function getImageUri(img) {
    return _.has(img, 'sourceURL') ? img.sourceURL : '';
}

export function getImagePath(img) {
    return _.has(img, 'path') ? img.path : '';
}

export function getImageName(img) {
    return _.has(img, 'filename')
        ? img.filename
        : 'img-' + Math.floor(Math.random() * 100) + '.jpeg';
}

// export async function internetChecker() {
//   return await checkInternetConnection();
// }

// export function calculateDistance(
//   currentLat,
//   currentLong,
//   latitude,
//   longitude
// ) {
//   let currentLongA = !validate.isEmpty(currentLong) ? currentLong : null;
//   let currentLatA = !validate.isEmpty(currentLat) ? currentLat : null;
//   let latitudeA = !validate.isEmpty(latitude) ? latitude : null;
//   let longitudeA = !validate.isEmpty(longitude) ? longitude : null;
//   if (
//     !validate.isEmpty(currentLatA) &&
//     !validate.isEmpty(currentLongA) &&
//     !validate.isEmpty(latitudeA) &&
//     !validate.isEmpty(longitudeA)
//   ) {
//     return getDistance(
//       {latitude: parseFloat(currentLatA), longitude: currentLongA},
//       {latitude: parseFloat(latitudeA), longitude: longitudeA}
//     );
//   } else {
//     return null;
//   }
// }

export function getPathForDeepLinking(url) {
    const delimiter = url.split('://');
    let type = delimiter[1].split('/')[0];
    let id = delimiter[1].split('/')[1];
    return {type, id};
}

export function getProductConvertedFinalPrice(price, rate) {
    return _.round(price * rate, 2);
}

export function getConvertedFinalPrice(price, rate) {
    return _.round(price * rate, 2);
}

export function getWhatsappLink(number, text = '') {
    return `https://api.whatsapp.com/send?phone=${number}&text=${text}`;
}

export function adjustColor(color, amount) {
    return (
        '#' +
        color
            .replace(/^#/, '')
            .replace(/../g, (color) =>
                (
                    '0' +
                    Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)
                ).substr(-2)
            )
    );
}

export const isLocal = () => process.env.NODE_ENV !== "production";
export const calculateRating = (ratings) => _.round((_.sumBy(ratings, r => r.value) / (ratings.length)) / 20)
export const getTypeFromModel = (model) => _.lowerCase(_.last(_.split(model, 'Models', 2)));
export const getFileType = (model) => _.lowerCase(_.last(_.split(model, '.', 2)));

export const calculateShipmentFees = (
    enableProducts,
    countryIsLocal,
    receiveFromShop,
    globalReceiveFromShop,
    applyGlobalShipment,
    globalShipmentFees,
    multiCartMerchant,
    merchantEnableReceiveFromShop,
    merchantCustomeDelivery,
    merchantCustomeDeliveryFees,
    governatePrice,
    countryPrice,
    cartTotalItems
) => {

    // console.log('enableProducts', enableProducts);
    // console.log('countryIsLocal', countryIsLocal);
    // console.log('receiveFromShop', receiveFromShop);
    // console.log('globalReceiveFromShop', globalReceiveFromShop);
    // console.log('applyGlobalShipment', applyGlobalShipment);
    // console.log('globalShipmentFees', globalShipmentFees);
    // console.log('multiCartMerchant', multiCartMerchant);
    // console.log('merchantEnableReceiveFromShop', merchantEnableReceiveFromShop);
    // console.log('merchantCustomeDelivery', merchantCustomeDelivery);
    // console.log('merchantCustomeDeliveryFees', merchantCustomeDeliveryFees);
    // console.log('governatePrice', governatePrice);
    // console.log('countryPrice', countryPrice);
    // console.log('cartTotalItem', cartTotalItems);
    if (!enableProducts) {
        return 0;
    }
    if (countryIsLocal && receiveFromShop && globalReceiveFromShop && merchantEnableReceiveFromShop) {
        return 0;
    } else if (applyGlobalShipment) {
        // Global Fees
        return globalShipmentFees;
    } else if (merchantCustomeDelivery && !multiCartMerchant && !merchantEnableReceiveFromShop && countryIsLocal) {
        // Merchant Custome Fees
        return merchantCustomeDeliveryFees
    } else if (countryIsLocal) {
        // Governate Price
        return parseFloat(governatePrice);
    } else {
        // Governate Price while country is Not local
        return parseFloat(governatePrice) * cartTotalItems;
    }

}
