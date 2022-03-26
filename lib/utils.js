const { trim } = require("lodash");

export function stringToSlug(string) {
    return trim(
        string
            .toLowerCase()
            .replace(/[\|\s\.\/:#&']/g, "-")
            .replace(/-+/g, "-"),
        "-",
    );
}

export function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
