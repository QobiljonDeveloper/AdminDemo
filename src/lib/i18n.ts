import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: {
                    "Welcome": "Welcome to Admin Panel",
                    "News": "News",
                    "Gallery": "Gallery",
                    "Opportunities": "Opportunities",
                    "FAQ": "FAQ",
                    "Contact": "Contact",
                    "Settings": "Settings",
                    "Logout": "Logout"
                }
            },
            uz: {
                translation: {
                    "Welcome": "Admin Panelga Xush Kelibsiz",
                    "News": "Yangiliklar",
                    "Gallery": "Galereya",
                    "Opportunities": "Imkoniyatlar",
                    "FAQ": "FAQ",
                    "Contact": "Aloqa",
                    "Settings": "Sozlamalar",
                    "Logout": "Chiqish"
                }
            }
        },
        lng: "en", // default language
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
