declare var require: any;

export const environment = {
  production: true,
  apiUrl: require('./../.env.json').apiUrl || 'http://localhost:3000'
};
