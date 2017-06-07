import 'zone.js/dist/zone-node';
import { enableProdMode } from '@angular/core';
import { AppServerModuleNgFactory } from '../../aot/src/uni/app.server.ngfactory';
import * as express from 'express';
import { ngUniversalEngine } from './universal-engine';
enableProdMode();
const server: any = express();
// set our angular engine as the handler for html files, so it will be used to render them.
server.engine('html', ngUniversalEngine({
    bootstrap: [AppServerModuleNgFactory]
}));
// set default view directory
server.set('views', 'src');
// handle requests for routes in the app.  ngExpressEngine does the rendering.
server.get(['/', '/dashboard', '/heroes', '/detail/:id'], (req, res) => {
    res.render('index-aot.html', {req});
});
// handle requests for static files
server.get(['/*.css'], (req, res, next) => {
    const fileName = req.originalUrl;
    console.log(fileName);
    const root = fileName.startsWith('/node_modules/') ? '.' : 'src';
    res.sendFile(fileName, { root: root }, function (err) {
        if (err) {
            next(err);
        }
    });
});
server.get(['/*.js'], (req, res, next) => {
    const fileName = req.originalUrl;
    console.log(fileName);
    const root = fileName.startsWith('/node_modules/') ? '.' : 'src/dist';
    res.sendFile(fileName, { root: root }, function (err) {
        if (err) {
            next(err);
        }
    });
});
// start the server
server.listen(3200, () => {
    console.log('listening on port 3200...');
});
