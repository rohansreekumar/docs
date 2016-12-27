'use strict';

// https://github.com/angular/angular.js/blob/master/lib/versions/version-info.js

var fs = require('fs');
var path = require('path');
var shell = require('shelljs');
var semver = require('semver');
var _ = require('lodash');

var currentPackage, previousVersions, cdnVersion, gitRepoInfo;


/**
 * Load information about this project from the package.json
 * @return {Object} The package information
 */
var getPackage = function () {
    // Search up the folder hierarchy for the first package.json
    var packageFolder = path.resolve('.');
    while (!fs.existsSync(path.join(packageFolder, 'package.json'))) {
        var parent = path.dirname(packageFolder);
        if (parent === packageFolder) {
            break;
        }
        packageFolder = parent;
    }
    return JSON.parse(fs.readFileSync(path.join(packageFolder, 'package.json'), 'UTF-8'));
};


/**
 * Parse the github URL for useful information
 * @return {Object} An object containing the github owner and repository name
 */
var getGitRepoInfo = function () {
    var GITURL_REGEX = /^https:\/\/github.com\/([^\/]+)\/(.+).git$/;
    var match = GITURL_REGEX.exec(currentPackage.repository.url);
    var git = {
        owner: match[1],
        repo: match[2],
        branch: getBranch()
    };

    return git;
};


/**
 * Compute a build segment for the version, from the Jenkins build number and current commit SHA
 * @return {String} The build segment of the version
 */
function getBuild() {
    var hash = shell.exec('git rev-parse --short HEAD', {silent: true}).output.replace('\n', '');
    return 'sha.' + hash;
}

/**
 * Get the current branch
 * @return {string} the branch name
 */
function getBranch() {
    var branchName = shell.exec('git rev-parse --abbrev-ref HEAD', {silent: true}).output.replace('\n', '');
    return branchName;
}

/**
 * Stable versions have an even minor version and have no prerelease
 * @param  {SemVer}  version The version to test
 * @return {Boolean}         True if the version is stable
 */
var isStable = function (version) {
    return semver.satisfies(version, '1.0 || 1.2') && version.prerelease.length === 0;
};


/**
 * Get the unstable snapshot version
 * @return {SemVer} The snapshot version
 */
var getSnapshotVersion = function () {
    var version = semver(currentPackage.version);

    // We need to clone to ensure that we are not modifying another version
    version = semver(version.raw);

    version.prerelease = ['local'];
    version.build = getBuild();
    version.codeName = 'snapshot';
    version.isSnapshot = true;
    version.format();
    version.full = version.version + '+' + version.build;

    return version;
};


exports.currentPackage = currentPackage = getPackage();
exports.gitRepoInfo = gitRepoInfo = getGitRepoInfo();
exports.currentVersion = getSnapshotVersion();
