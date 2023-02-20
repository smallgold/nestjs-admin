const config = import(`./env.${process.env.NODE_ENV}.ts`);
export default config;
