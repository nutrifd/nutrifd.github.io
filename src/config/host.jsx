export default {
    baseUrl: process.env.REACT_APP_BASE_URL || '',
    appName: "Nutri",
    env: process.env.NODE_ENV || "development",
    enableMock: !process.env.REACT_APP_BASE_URL
};