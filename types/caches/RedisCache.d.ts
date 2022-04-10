declare type RedisCache = (config: {
    url: string;
}) => Promise<void>;
declare const RedisCache: RedisCache;
export default RedisCache;
