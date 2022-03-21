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
