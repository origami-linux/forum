class Params
{
    constructor(url)
    {
        this.params = {};

        url.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => { this.params[key] = value; });
    }

    get(key)
    {
        return this.params[key];
    }

    forEach(callback)
    {
        this.params.forEach(callback);
    }
};

export { Params };
