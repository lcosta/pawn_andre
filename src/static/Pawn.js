Pawn = {
    /**
     * Make XHTML request to an endpoint
     *
     * @param {string} e endpoint
     * @param {string} t type [POST/GET]
     * @param {object} d data to send
     * @param {boolean=} async async flag. Default true
     * @returns {*|{readyState, getResponseHeader, getAllResponseHeaders, setRequestHeader, overrideMimeType, statusCode, abort}}
     */
    request: function (e, t, d, async) {
        return $.ajax({
            url: e,
            type: t,
            data: d,
            async: async || true
        });
    },

    /**
     * POST request
     *
     * @param {string} e endpoint
     * @param {object} d data to send
     * @param {boolean=} async async flag. Default true
     * @returns {*|{readyState, getResponseHeader, getAllResponseHeaders, setRequestHeader, overrideMimeType, statusCode, abort}}
     */
    post: function (e, d, async) {
        return this.request(e, "POST", d, async);
    },

    /**
     * GET request
     *
     * @param {string} e endpoint
     * @param {object} d data to send
     * @param {boolean=} async async flag. Default true
     * @returns {*|{readyState, getResponseHeader, getAllResponseHeaders, setRequestHeader, overrideMimeType, statusCode, abort}}
     */
    get: function (e, d, async) {
        return this.request(e, "GET", d, async);
    }
};