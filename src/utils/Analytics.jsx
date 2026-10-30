// src/utils/Analytics.jsx
// Libreria
import { logEvent } from "firebase/analytics";
import { analytics } from "@fireconfig/config";

export const AnalyticsCart = (keyName, item, quantity) => {
    if (!analytics) return;

    logEvent(analytics, keyName, {
        currency: 'ARS',
        value: item.price * quantity,
        items: [
            {
                item_id: item.id,
                item_name: item.title,
                price: item.price,
                quantity: quantity
            }
        ]
    });
};