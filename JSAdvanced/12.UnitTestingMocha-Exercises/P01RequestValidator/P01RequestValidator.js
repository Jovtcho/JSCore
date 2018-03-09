function validateRequest(requestObj) {
    let methods = ['GET', 'POST', 'DELETE', 'CONNECT'];
    let uriRegex = new RegExp(/^([A-Za-z0-9.]+|\*)$/, 'g');
    let versions = ['HTTP/0.9', 'HTTP/1.0', 'HTTP/1.1', 'HTTP/2.0'];
    let messageRegex = new RegExp(/^[^\<\>\\\&\'\"]*$/, 'g');

    let method = requestObj.method;
    if (method === undefined || !methods.includes(method)) {
        throw new Error("Invalid request header: Invalid Method");
    }

    let uri = requestObj.uri;
    if (uri === undefined || !uriRegex.test(uri) || requestObj.uri.length === 0) {
        throw new Error("Invalid request header: Invalid URI");
    }

    let version = requestObj.version;
    if (version === undefined || !versions.includes(version)) {
        throw new Error("Invalid request header: Invalid Version");
    }

    let message = requestObj.message;
    if (message === undefined || !messageRegex.test(message)) {
        throw new Error("Invalid request header: Invalid Message");
    }

    return requestObj;
}

console.log(validateRequest({
    method: 'GET',
    uri: 'svn.public.catalog',
    version: 'HTTP/1.1',
    message: ''
}));

// validateRequest({
//     method: 'OPTIONS',
//     uri: 'git.master',
//     version: 'HTTP/1.1',
//     message: '-recursive'
// });

