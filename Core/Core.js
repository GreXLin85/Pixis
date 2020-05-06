module.exports.getFileNameFromLink = function (i) {
    return i.split("/")[i.split("/").length - 1]
}

module.exports.HelpText =
    "--help                                 | For Seeing Help Message\n" +
    "--link <link>                          | For defining a link to download files\n"+
    "Usage : "+require("yargs").argv.$0+" --link <link>"


module.exports.argvCheckButRequire = function (argv) {
    if (argv != true || argv != false || argv != "" || argv != undefined) {
        return true
    } else {
        return false        
    }
}

module.exports.Downloader = require("./Downloader")