import { Octokit } from '@octokit/rest';
import fs from 'fs';
import path from 'path';

const token = process.argv[2] || process.env.GITHUB_TOKEN;
const owner = 'akshavik';
const repo = 'fairshift';

if (!token) {
  console.error("ERROR: GitHub Personal Access Token is required.");
  process.exit(1);
}

const octokit = new Octokit({ auth: token });

const ignoredDirs = new Set(['node_modules', '.git', 'dist', '.vercel', 'logs', '.idea', '.vscode']);
const ignoredFiles = new Set(['.DS_Store', 'thumbs.db']);

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    const relPath = path.relative(process.cwd(), fullPath).replace(/\\/g, '/');

    if (ignoredDirs.has(file) || ignoredFiles.has(file)) {
      return;
    }

    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push({ fullPath, relPath });
    }
  });

  return arrayOfFiles;
}

async function run() {
  try {
    console.log(`Checking authenticated user for token...`);
    const { data: user } = await octokit.rest.users.getAuthenticated();
    console.log(`Authenticated as GitHub user: @${user.login}`);

    // Check or create repository
    let repoData;
    try {
      const existing = await octokit.rest.repos.get({ owner, repo });
      repoData = existing.data;
      console.log(`Found repository: ${repoData.html_url}`);
    } catch (err) {
      if (err.status === 404) {
        console.log(`Creating new public repository '${repo}' under @${owner}...`);
        const created = await octokit.rest.repos.createForAuthenticatedUser({
          name: repo,
          description: "FairShift — A Decent Work Platform for Employee-Intensive Organisations (UN SDG 8)",
          homepage: "https://quick-cerulean-ooevllk.tmp.now",
          private: false,
          has_issues: true,
          has_projects: true,
          has_wiki: true
        });
        repoData = created.data;
        console.log(`Repository created: ${repoData.html_url}`);
      } else {
        throw err;
      }
    }

    // Check if repo is empty by trying to get main branch
    let isEmpty = false;
    let baseTreeSha = null;
    let parentCommitSha = null;
    try {
      const branch = await octokit.rest.repos.getBranch({ owner, repo, branch: 'main' });
      parentCommitSha = branch.data.commit.sha;
      baseTreeSha = branch.data.commit.commit.tree.sha;
      console.log(`Found existing main branch at commit ${parentCommitSha}`);
    } catch (e) {
      isEmpty = true;
      console.log(`Repository is empty. Initializing root commit with README.md...`);
      const readmePath = path.join(process.cwd(), 'README.md');
      const readmeContent = fs.readFileSync(readmePath, 'utf8');

      const initCommit = await octokit.rest.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: 'README.md',
        message: 'Initial commit: Initialize FairShift repository',
        content: Buffer.from(readmeContent).toString('base64'),
        branch: 'main'
      });

      parentCommitSha = initCommit.data.commit.sha;
      const branch = await octokit.rest.repos.getBranch({ owner, repo, branch: 'main' });
      baseTreeSha = branch.data.commit.commit.tree.sha;
      console.log(`Root commit initialized at ${parentCommitSha}`);
    }

    // Collect all project files
    console.log(`Scanning local files in ${process.cwd()}...`);
    const allFiles = getAllFiles(process.cwd());
    // Filter out README.md if already initialized, or include it
    console.log(`Found ${allFiles.length} project files to deploy.`);

    // Create blobs for each file
    const treeItems = [];
    for (const file of allFiles) {
      const content = fs.readFileSync(file.fullPath);
      const isBinary = content.includes(0);

      const { data: blob } = await octokit.rest.git.createBlob({
        owner,
        repo,
        content: isBinary ? content.toString('base64') : content.toString('utf-8'),
        encoding: isBinary ? 'base64' : 'utf-8'
      });

      treeItems.push({
        path: file.relPath,
        mode: '100644',
        type: 'blob',
        sha: blob.sha
      });
      console.log(`  Uploaded: ${file.relPath}`);
    }

    // Create Git Tree
    console.log(`Creating Git tree with ${treeItems.length} files...`);
    const { data: tree } = await octokit.rest.git.createTree({
      owner,
      repo,
      base_tree: baseTreeSha,
      tree: treeItems
    });

    // Create Commit
    console.log(`Creating Git commit...`);
    const { data: commit } = await octokit.rest.git.createCommit({
      owner,
      repo,
      message: "feat: FairShift complete codebase with Stitch UI, multi-industry config & Vercel deployment",
      tree: tree.sha,
      parents: [parentCommitSha]
    });

    // Update main branch
    console.log(`Updating main branch reference to commit ${commit.sha}...`);
    await octokit.rest.git.updateRef({
      owner,
      repo,
      ref: 'heads/main',
      sha: commit.sha,
      force: true
    });

    console.log(`\n============================================================`);
    console.log(`SUCCESS! FAIRSHIFT DEPLOYED TO GITHUB:`);
    console.log(`Repository URL: ${repoData.html_url}`);
    console.log(`Commit URL: https://github.com/${owner}/${repo}/commit/${commit.sha}`);
    console.log(`Deploy with Vercel: https://vercel.com/new/import?s=${encodeURIComponent(repoData.html_url)}`);
    console.log(`============================================================\n`);
  } catch (err) {
    console.error("Deployment failed:", err.message);
    if (err.response) {
      console.error("Response data:", err.response.data);
    }
    process.exit(1);
  }
}

run();
