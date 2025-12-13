<script setup>
import { onMounted } from "vue";

function escapeSpecialCharacters(contentToEscape) {
  const tagsToReplace = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
  };

  return (contentToEscape || "").replace(
    /[&<>]/g,
    (tag) => tagsToReplace[tag] || tag,
  );
}

function refToBranch(ref) {
  if (ref) return ref.replace("refs/heads/", "");
}

function generateEvent(event) {
  switch (event.type) {
    case "CommitCommentEvent":
      return `
        <strong><a
          href="${generateUrl("actor", event)}"
          rel="noopener noreferrer"
          target="_blank"
          title="Visit ${event.actor.login}'s profile on GitHub"
        >${event.actor.display_login}</a></strong> commented on

        <a
          href="${generateUrl("comment", event)}"
          target="_blank"
          title="View this comment on GitHub"
          rel="noopener noreferrer"
        >commit</a> in
      `;

    case "CreateEvent":
      return `
        <strong><a
          href="${generateUrl("actor", event)}"
          rel="noopener noreferrer"
          target="_blank"
          title="Visit ${event.actor.login}'s profile on GitHub"
        >${event.actor.display_login}</a></strong> created ${event.payload.ref_type}

        <code><a
          href="${generateUrl("create", event)}"
          rel="noopener noreferrer"
          target="_blank"
          title="View this branch on GitHub"
        >${refToBranch(event.payload.ref)}</a></code> in
      `;

    case "DeleteEvent":
      return `
        <strong><a
          href="${generateUrl("actor", event)}"
          rel="noopener noreferrer"
          target="_blank"
          title="Visit ${event.actor.login}'s profile on GitHub"
        >${event.actor.display_login}</a></strong> deleted

        ${event.payload.ref_type} <code>${event.payload.ref}</code> in
      `;

    case "ForkEvent":
      return `
        <strong><a
          href="${generateUrl("actor", event)}"
          rel="noopener noreferrer"
          target="_blank"
          title="Visit ${event.actor.login}'s profile on GitHub"
        >${event.actor.display_login}</a></strong> forked

        <strong><a
          href="${generateUrl("repo", event)}"
          rel="noopener noreferrer"
          target="_blank"
          title="View this repo on GitHub"
        >${event.repo.name}</a></strong> to

        <strong><a
          href="${generateUrl("forkee", event)}"
          rel="noopener noreferrer"
          target="_blank"
          title="View this repo fork on GitHub"
        >${event.payload.forkee.full_name}</a></strong>
      `;

    case "IssueCommentEvent":
      if (event.payload.issue.pull_request) {
        return `
          <strong><a
            href="${generateUrl("actor", event)}"
            rel="noopener noreferrer"
            target="_blank"
            title="Visit ${event.actor.login}'s profile on GitHub"
          >${event.actor.display_login}</a></strong> commented on pull request

          <em><a
            href="${generateUrl("issue", event)}"
            rel="noopener noreferrer"
            target="_blank"
            title="View this comment on GitHub"
          >${escapeSpecialCharacters(event.payload.issue.title)}</a></em> in
        `;
      } else {
        return `
          <strong>${event.actor.display_login}</strong> commented on issue

          <em><a
            href="${generateUrl("issue", event)}"
            rel="noopener noreferrer"
            target="_blank"
            title="View this comment on GitHub"
          >${escapeSpecialCharacters(event.payload.issue.title)}</a></em> in
        `;
      }

    case "IssuesEvent":
      return `
        <strong><a
          href="${generateUrl("actor", event)}"
          rel="noopener noreferrer"
          target="_blank"
          title="Visit ${event.actor.login}'s profile on GitHub"
        >${event.actor.display_login}</a></strong> ${event.payload.action} issue

        <em><a
          href="${generateUrl("issue", event)}"
          rel="noopener noreferrer"
          target="_blank"
          title="View this issue on GitHub"
        >${escapeSpecialCharacters(event.payload.issue.title)}</a></em> in
      `;

    case "PullRequestEvent":
      return `
        <strong><a
          href="${generateUrl("actor", event)}"
          rel="noopener noreferrer"
          target="_blank"
          title="Visit ${event.actor.login}'s profile on GitHub"
        >${event.actor.display_login}</a></strong> pull request

        <em><a
          href="${generateUrl("pull_request", event)}"
          rel="noopener noreferrer"
          target="_blank"
          title="View this pull request on GitHub"
        >${escapeSpecialCharacters(event.payload.pull_request.title)}</a></em> in
      `;

    case "PullRequestReviewEvent":
      return `
        <strong><a
          href="${generateUrl("actor", event)}"
          rel="noopener noreferrer"
          target="_blank"
          title="Visit ${event.actor.login}'s profile on GitHub"
        >${event.actor.display_login}</a></strong> reviewed pull request

        <em><a
          href="${generateUrl("pull_request", event)}"
          rel="noopener noreferrer"
          target="_blank"
          title="View this review on GitHub"
        >${escapeSpecialCharacters(event.payload.pull_request.title)}</a></em> in
      `;

    case "PullRequestReviewCommentEvent":
      return `
        <strong><a
          href="${generateUrl("actor", event)}"
          rel="noopener noreferrer"
          target="_blank"
          title="Visit ${event.actor.login}'s profile on GitHub"
        >${event.actor.display_login}</a></strong> commented on pull request

        <em><a
          href="${generateUrl("pull_request", event)}"
          rel="noopener noreferrer"
          target="_blank"
          title="View this comment on GitHub"
        >${escapeSpecialCharacters(event.payload.pull_request.title)}</a></em> in
      `;

    case "PushEvent":
      return `
        <strong><a
          href="${generateUrl("actor", event)}"
          rel="noopener noreferrer"
          target="_blank"
          title="Visit ${event.actor.login}'s profile on GitHub"
        >${event.actor.display_login}</a></strong> pushed to

        <code><a
          href="${generateUrl("push", event)}"
          rel="noopener noreferrer"
          target="_blank"
          title="View this branch on GitHub"
        >${refToBranch(event.payload.ref)}</a></code> in
      `;

    case "ReleaseEvent":
      return `
        <strong><a
          href="${generateUrl("actor", event)}"
          rel="noopener noreferrer"
          target="_blank"
          title="Visit ${event.actor.login}'s profile on GitHub"
        >${event.actor.display_login}</a></strong> released

        <em><a
          href="${generateUrl("release", event)}"
          title="View this release on GitHub"
          target="_blank"
          rel="noopener noreferrer"
        >${event.payload.release.tag_name}</a></em> in
      `;

    case "WatchEvent":
      return `
        <strong><a
          href="${generateUrl("actor", event)}"
          rel="noopener noreferrer"
          target="_blank"
          title="Visit ${event.actor.login}'s profile on GitHub"
        >${event.actor.display_login}</a></strong> starred the repo
      `;

    default:
      break;
  }
}

function generateGitHubFeed(feed, selector) {
  const renderedEvents = [];

  for (const event of feed) {
    const repoName = `
      <a href="${generateUrl("repo", event)}" title="View this repo on GitHub" target="_blank" rel="noopener noreferrer"><strong>${event.repo.name}</strong></a>
    `;

    renderedEvents.push(`
      <div class='github-feed__event'>
        <a href="${generateUrl("actor", event)}" target="_blank" rel="noopener noreferrer">
          <img src="${event.actor.avatar_url}" class="github-feed__event__avatar" alt="${event.actor.login}'s avatar"/>
        </a>

        <p>
          ${generateEvent(event)}
          ${event.type !== "ForkEvent" ? repoName : ""}
          <!--em class="github-feed__event__time">$-{relativeDate(new Date(event.created_at))}</em-->
        </p>
      </div>
    `);
  }

  const now = new Date();
  const lastGithubFeedUpdate = {
    date: now.toISOString().split("T")[0],
    time: now.toLocaleTimeString("en-US", {
      timeZone: "UTC",
    }),
  };

  document.querySelector(selector).innerHTML = `
    <h3>GitHub</h3>
    <h5 class="last-updated">Last updated: ${lastGithubFeedUpdate.date} at ${lastGithubFeedUpdate.time} UTC</h5>
    ${renderedEvents.join("")}
  `;
}

function generateUrl(type, event) {
  switch (type) {
    case "actor":
      return `https://github.com/${event.actor.display_login}`;

    case "comment":
      return event.payload.comment.html_url;

    case "create":
      return `https://github.com/${event.repo.name}/tree/${event.payload.ref}`;

    case "forkee":
      return `https://github.com/${event.payload.forkee.full_name}`;

    case "issue":
      return event.payload.issue.html_url;

    case "pull_request":
      return event.payload.pull_request.html_url;

    case "push":
      return `https://github.com/${event.repo.name}/tree/${event.payload.ref.replace("refs/heads/", "")}`;

    case "release":
      return event.payload.release.html_url;

    case "repo":
      return `https://github.com/${event.repo.name}`;

    default:
      break;
  }
}

async function fetchGitHubFeed() {
  const headers = new Headers();
  // if(process?.env?.GITHUB_TOKEN || null){
  //   headers.set('Authorization',`Bearer ${process.env.GITHUB_TOKEN}`);
  // }

  const response = await fetch(
    `https://api.github.com/orgs/lbryfoundation/events`,
    {
      headers: headers,
    },
  );
  try {
    return await response.json();
  } catch (ex) {
    throw new Error("Failed parsing JSON");
  }
}

async function updateGitHubFeed() {
  const feed = await fetchGitHubFeed();
  generateGitHubFeed(feed, "#github-feed");
}

onMounted(async () => {
  setInterval(
    async () => {
      await updateGitHubFeed();
    },
    5 * 60 * 1000,
  );

  await updateGitHubFeed();
});
</script>

<style>
.github-feed {
  border-bottom: 1px solid #888;
  font-size: 0.8rem;
  grid-area: github;
  position: relative;

  @media (min-width: 1301px) {
    padding-top: 3.7rem;
  }

  @media (min-width: 1001px) and (max-width: 1300px) {
    padding-top: 2.95rem;
  }

  @media (min-width: 1001px) {
    border-left: 1px solid #888;
    padding-right: 10%;
    padding-bottom: 2rem;
    padding-left: 2rem;
  }

  @media (max-width: 1000px) {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }

  @media (min-width: 901px) and (max-width: 1000px) {
    padding-right: 1rem;
    padding-left: 1rem;
  }

  @media (max-width: 900px) {
    padding-right: 2rem;
    padding-left: 2rem;
  }

  @media (max-width: 700px) {
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
  }

  h3,
  h5 {
    @media (min-width: 1001px) {
      text-align: center;
    }
  }

  h3 {
    letter-spacing: 0.1rem;
    line-height: 1;
    text-transform: uppercase;

    @media (min-width: 1301px) {
      width: calc(100% - (1rem + 5%));
      top: 2.15rem;
      left: 0;

      color: rgba(0, 0, 0, 0.045);
      font-size: 4rem;
      position: absolute;
    }

    @media (max-width: 1300px) {
      color: black;
    }

    @media (min-width: 901px) and (max-width: 1300px) {
      font-size: 3rem;
    }

    @media (max-width: 900px) {
      font-size: 2rem;
      margin-bottom: 1rem;
    }
  }

  h5 {
    font-style: italic;
    font-weight: normal;

    @media (min-width: 1001px) {
      margin-bottom: 3rem;
    }

    @media (min-width: 901px) and (max-width: 1000px) {
      margin-bottom: 2rem;
    }

    @media (max-width: 900px) {
      top: -1rem;

      margin-bottom: 0.5rem;
      position: relative;
    }
  }
}

.github-feed__event {
  cursor: default;
  line-height: 1.55;

  @media (max-width: 700px) {
    width: 200px;

    display: inline-block;
    margin-right: 1.25rem;
    vertical-align: top;
  }

  &:not(:last-of-type) {
    @media (min-width: 701px) {
      margin-bottom: 1.25rem;
    }
  }

  > a:first-of-type {
    width: 100%;

    font-weight: 700;
    margin-bottom: 0.5rem;

    @media (max-width: 700px) {
      display: block;
    }
  }

  > p:first-of-type {
    @media (max-width: 700px) {
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    }

    code {
      padding: 0.2rem 0.5rem;
      top: -1px;

      background-color: black;
      border-radius: 3px;
      color: white;
      font-size: 80%;
      letter-spacing: 0.05rem;
      position: relative;
    }

    em:not(.github-feed__event__time) {
      text-decoration: underline;
    }

    @media (min-width: 701px) {
      width: calc(100% - 4.5rem);

      display: inline-block;
      margin-left: 0.5rem;
      vertical-align: top;
    }

    @media (max-width: 700px) {
      width: 90%;
      padding: 1rem;
      top: -3.5rem;
      left: 5%;

      background-color: white;
      border: 1px solid gray;
      border-radius: 3px;
      overflow-x: hidden;
      position: relative;
      white-space: normal;
    }
  }
}

.github-feed__event__avatar {
  border: 1px solid gray;
  border-radius: 3px;
  object-fit: cover;
  object-position: center;

  @media (min-width: 701px) {
    width: 2.5rem;
    height: 2.5rem;
  }

  @media (max-width: 700px) {
    width: 100%;
    height: 100%;
  }
}

.github-feed__event__time {
  color: gray;
  display: block;

  @media (max-width: 700px) {
    padding-top: 1rem;
  }
}
</style>

<template>
  <div id="github-feed" class="github-feed">
    <h3>GitHub</h3>
    <h5 class="last-updated">Unable to fetch latest GitHub data</h5>
  </div>
</template>
