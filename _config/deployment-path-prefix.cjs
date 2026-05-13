const { execFileSync } = require('node:child_process');
const gitBranch = require('git-branch');

const previewRepository = 'waynegraham/forum2026';
const productionRepository = 'clirdlf/forum2026';

function normalizeRepository(value = '') {
  return value
    .trim()
    .toLowerCase()
    .replace(/^git@github\.com:/, '')
    .replace(/^https:\/\/github\.com\//, '')
    .replace(/\.git$/, '');
}

function getRemoteRepository(remoteName) {
  try {
    return normalizeRepository(
      execFileSync('git', ['remote', 'get-url', remoteName], {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore'],
      })
    );
  } catch {
    return '';
  }
}

function getCurrentBranch() {
  try {
    return gitBranch.sync() || '';
  } catch {
    return '';
  }
}

function getDeploymentPathPrefix() {
  const githubRepository = normalizeRepository(process.env.GITHUB_REPOSITORY);

  if (githubRepository === previewRepository) {
    return '/forum2026/';
  }

  if (githubRepository === productionRepository) {
    return '';
  }

  const currentBranch = getCurrentBranch();

  if (currentBranch === 'dev' && getRemoteRepository('dev') === previewRepository) {
    return '/forum2026/';
  }

  return '';
}

module.exports = {
  getDeploymentPathPrefix,
};
