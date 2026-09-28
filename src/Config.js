const trimTrailingSlash = (value) => String(value || '').replace(/\/+$/, '');

const config = {
    server: trimTrailingSlash(process.env.VUE_APP_SERVER),
    siteKey: process.env.VUE_APP_SITE_KEY || 'logos'
};

export default config;
