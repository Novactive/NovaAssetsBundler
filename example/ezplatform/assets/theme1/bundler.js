'use strict';

const AssetsBundler = require('@novactive/assets-bundler/src/assetsbundler/Bundler');
const ImagesOptimisationTask = require('@novactive/assets-bundler/src/assetsbundler/task/ImagesOptimisation');
const LessTransformTask = require('@novactive/assets-bundler/src/assetsbundler/task/LessTransform');
// const SassTransformTask = require('@novactive/assets-bundler/src/assetsbundler/task/SassTransform');
const JavascriptTransformTask = require('@novactive/assets-bundler/src/assetsbundler/task/JavascriptTransform');
const MoveTask = require('@novactive/assets-bundler/src/assetsbundler/task/Move');
const bundler = new AssetsBundler("theme1");
bundler.addTask(new JavascriptTransformTask('js/main', `${__dirname}/js/main.js`));
bundler.addTask(new LessTransformTask('css/main', `${__dirname}/less/main.less`));
// bundler.addTask(new LessTransformTask('css/main', `${__dirname}/scss/main.scss`));
bundler.addTask(new ImagesOptimisationTask(`${__dirname}/images/`, null, 'images'));
bundler.addTask(new MoveTask(`${__dirname}/fonts/`, null, 'fonts'));
module.exports = bundler;
