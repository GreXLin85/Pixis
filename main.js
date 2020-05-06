const argv = require("yargs").argv
var readlineSync = require('readline-sync');

const { argvCheckButRequire, HelpText, Downloader, getFileNameFromLink } = require("./Core/Core")

/**
 * ---Some Args--
 * --help
 * --link (require)
 * --filename (optional)
 * --downloadlocation (optional)
 */

var link = argv.link

if (argv.help == true) {
    console.log(HelpText)
}

if (argvCheckButRequire(argv.link)) {
    try {
        var filename = getFileNameFromLink(argv.link)
        console.log("[*]Note for file name : If you are want to select default file name press to enter.")
        var FileNameq = readlineSync.question('[?]File Name (' + filename + ') : ')
        if (FileNameq != "") {
            filename = FileNameq
        }
        console.log(filename + "\n" + FileNameq)

        var downloadlocation = __dirname + '/downloads/'
        console.log("\n[*]Note for download location : If you are want to select default file name press to enter.")
        var DownloadLocationq = readlineSync.question('[?]Download Location (' + downloadlocation + ') : ')
        if (DownloadLocationq != "") {
            downloadlocation = DownloadLocationq
        }
        console.log(downloadlocation + "\n" + DownloadLocationq)

        console.log(downloadlocation + filename)
        Downloader(link, filename, downloadlocation)
    } catch (error) {
        console.log("[!]There is a error\n" + error)
        if (link == false || link == undefined) {
            console.log("[*]Maybe this can help you\n" + HelpText)
        }
    }

}