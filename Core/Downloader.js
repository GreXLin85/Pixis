const request = require('request');
const progress = require('request-progress');
const ProgressBar = require('progress');

module.exports = (link, filename, location) => {
    var bar = new ProgressBar(filename + ' [:bar] :percent :seconds sec ', {
        complete: '=',
        incomplete: ' ',
        width: 100,
        total: 50
    });

    progress(request(link))
        .on('progress', function (state) {
            bar = new ProgressBar(filename + ' [:bar] :percent :seconds sec ', {
                complete: '=',
                incomplete: ' ',
                width: 100,
                total: state.size.total
            });

            bar.tick(state.size.transferred, {
                'seconds': state.time.remaining
            })
        })
        .on('error', function (err) {
            console.log("[!]There is a error\n" + err)
        })
        .on('end', function () {
            console.log("\n✔️ File has been downloaded")
        })
        .pipe(require('fs').createWriteStream(location + filename));
}