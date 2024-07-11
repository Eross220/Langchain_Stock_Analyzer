// detectURL.js
export function detectURL(message) {
    var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
    return message.replace(urlRegex, function (urlMatch) {
        return '<a href="' + urlMatch + '">' + urlMatch + '</a>';
    });
}
