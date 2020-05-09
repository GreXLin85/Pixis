const argv = require("yargs").argv
const readlineSync = require('readline-sync');
const {existsSync,mkdirSync} = require("fs")
const { argvCheckButRequire, HelpText, Downloader, getFileNameFromLink } = require("./Core/Core")

/**
 * ---Some Args--
 * --help
 * --link (require)
 */

const link = argv.link

if (argv.help == true) {
    console.log(HelpText)
}

if (argvCheckButRequire(argv.link)) {
    if (!existsSync("./downloads")) {
        mkdirSync("./downloads")
    }

    try {
        var filename = getFileNameFromLink(argv.link)

        if (filename == "") {
            while (true) {
                var FileNameq = readlineSync.question('[?]File Name : ')
                if (FileNameq != "") {
                    if (/([^\\/:*?<>|])$/.test(FileNameq)) {
                        filename = FileNameq
                        break
                    } else {
                        console.log("You can't use this characters \\/:*?<>|")
                    }
                } else {
                    console.log("You must define file name ([Example] : example.txt)")
                }
            }

            console.log(filename + "\n" + FileNameq)
        } else {
            console.log("[*]Note for file name : If you are want to select default file name press to enter.")
            var FileNameq = readlineSync.question('[?]File Name (' + filename + ') : ')
            if (FileNameq != "") {
                if (/([^\\/:*?<>|])$/.test(FileNameq)) {
                    filename = FileNameq
                } else {
                    console.log("You can't use this characters \\/:*?<>|")
                }
            }
            console.log(filename + "\n" + FileNameq)
        }

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
