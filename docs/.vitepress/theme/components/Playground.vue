<script setup>
import {onMounted} from "vue";

const lbrytvAPI_addSupport = function () { };

const lbrytvAPI_publish = function () { };

const lbrytvAPI_resolve = function (urls) {
  return new Promise(async (resolve, reject) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        method: "resolve",
        params: { urls: urls }
      })
    };

    const response = await fetch("https://api.na-backend.odysee.com/api/v1/proxy", options);
    let json;
    if (!response.ok) return reject(new Error("DAEMON ERROR: resolve"));

    try {
      json = await response.json();
    } catch (err) {
      return reject(new Error("DAEMON ERROR: resolve"));
    }

    return resolve(json.result);
  });
};

const lbrytvAPI_getTrending = function () {
  return new Promise(async (resolve, reject) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        method: "claim_search",
        params: {
          page_size: 20,
          page: 1,
          no_totals: true,
          any_tags:
            ["art",
              "automotive",
              "blockchain",
              "comedy",
              "economics",
              "education",
              "gaming",
              "music",
              "news",
              "science",
              "sports",
              "technology"],
          channel_ids: [],
          not_channel_ids: [],
          not_tags: ["porn", "porno", "nsfw", "mature", "xxx", "sex", "creampie", "blowjob", "handjob", "vagina", "boobs", "big boobs", "big dick", "pussy", "cumshot", "anal", "hard fucking", "ass", "fuck", "hentai"],
          order_by: ["trending_group", "trending_mixed"]
        }
      })
    };

    const response = await fetch("https://api.na-backend.odysee.com/api/v1/proxy", options);
    let json;
    if (!response.ok) return reject(new Error("DAEMON ERROR: resolve"));

    try {
      json = await response.json();
    } catch (err) {
      return reject(new Error("DAEMON ERROR: resolve"));
    }

    return resolve(json.result.items);
  });
};

async function publishMeme(publishMetadata){
  const queryUrl = process.env.NODE_ENV === "development" ?
    "http://localhost:5200/publish" :
    `https://${process.env.DAEMON_URL}/publish`;

  const options = {
    method: 'PUT',
    body: {
      authorization: process.env.LBRY_DAEMON_ACCESS_TOKEN,
      metadata: publishMetadata
    },
    json: true
  };

  try {
    const response = await fetch(queryUrl, options);
    return response.body;
  } catch(error) {
    return error;
  }
}

function randomString(len){
  if (!Number.isFinite(len)) throw new TypeError("Expected a finite number");
  return crypto.randomBytes(Math.ceil(len / 2)).toString("hex")
    .slice(0, len);
}

async function uploadImage(imageSource) {
  const queryUrl = process.env.NODE_ENV === "development" ?
    "http://localhost:5200/image" :
    `https://${process.env.DAEMON_URL}/image`;

  const options = {
    method: 'POST',
    body: {
      authorization: process.env.LBRY_DAEMON_ACCESS_TOKEN,
      image: imageSource
    },
    json: true
  };

  try {
    const response = await fetch(queryUrl, options);
    return response.body;
  } catch(error) {
    return error;
  }
}

const allowedQueryMethods = [
  "support_create",
  "publish",
  "resolve"
];

const approvedContentIdsForTipping = [
  "3db81c073f82fd1bb670c65f526faea3b8546720",
  "173412f5b1b7aa63a752e8832406aafd9f1ecb4e",
  "2a7f5db2678177435b1dee6c9e38e035ead450b6",
  "d81bac6d49b1f92e58c37a5f633a27a45b43405e",
  "b4668c0bd096317b44c40738c099b6618095e75f",
  "007789cc45cbb4255cf02ba77cbf84ca8e3d7561",
  "1ac47b8b3def40a25850dc726a09ce23d09e7009",
  "784b3c215a6f06b663fc1aa292bcb19f29c489bb",
  "758dd6497cdfc401ae1f25984738d024d47b50af",
  "8a7401b88d5ed0376d98f16808194d4dcb05b284"
];

const environment = process.env.NODE_ENV === "development" ?
  "development" :
  "production";

//  P A C K A G E

//const loadLanguages = require("prismjs/components");
//loadLanguages(["json"]);



//  E X P O R T

// export default async(data, socket) => {
//   const body = {};
//   let apiRequestMethod = "";
//   let dataDetails = "";
//   let explorerNotice = "";
//
//   if (data.example === 1 && (!data.claim || !data.method)) return;
//   if (data.example === 2 && !data.data) return;
//   if (data.example === 2) dataDetails = data.data; // file upload
//   if (data.example === 3 && (!data.claim || !data.method)) return;
//
//   const claimAddress = data.claim;
//   const resolveMethod = data.method;
//
//   if (allowedQueryMethods.indexOf(resolveMethod) < 0) {
//     return send(socket, {
//       details: "Unallowed resolve method for tutorial",
//       message: "notification",
//       type: "error"
//     });
//   }
//
//   body.authorization = process.env.LBRY_DAEMON_ACCESS_TOKEN;
//   body.method = resolveMethod;
//
//
//
//   switch(resolveMethod) {
//     //  T I P
//     //  E X A M P L E
//     case "support_create":
//       if (!approvedContentIdsForTipping.includes(claimAddress)) {
//         return send(socket, {
//           example: data.example,
//           html: raw(`
//             <h3>Response</h3>
//             <pre><code class="language-text">Tipping creators not in the whitelist for this example is not allowed.</code></pre>
//           `),
//           message: "show result",
//           selector: `#example${data.example}-result`
//         });
//       }
//
//       apiRequestMethod = "POST";
//       body.amount = "0.001"; // Hardcoded tip amount
//       body.claim_id = claimAddress;
//       body.tip = true;
//
//       break;
//
//
//
//     //  P U B L I S H
//     //  E X A M P L E
//     case "publish":
//       apiRequestMethod = "PUT";
//
//       // Required for publishing
//       body.author = "lbry.tech";
//       body.bid = "0.001"; // Hardcoded publish amount
//       body.description = dataDetails.description;
//       body.languages = [dataDetails.language];
//       body.license = dataDetails.license;
//       body.name = dataDetails.name + "-" + randomString(10);
//       body.title = dataDetails.title;
//       body.tags = dataDetails.tags;
//
//       // Gotta let the blockchain know what to save
//       body.file_path = dataDetails.file_path;
//
//       try {
//         const imageUploadResponse = await uploadImage(body.file_path);
//         body.file_path = imageUploadResponse.filename;
//
//         try {
//           const memePublishResponse = await publishMeme(body);
//
//           switch(true) {
//             case data.example === 2:
//             case memePublishResponse.result:
//             case memePublishResponse.result.outputs[0].address:
//               explorerNotice = memePublishMessaging(memePublishResponse);
//               break;
//
//             default:
//               break;
//           }
//
//           delete memePublishResponse.result.lbrytech_claim_name;
//
//           const renderedCode = prism.highlight(
//             JSON.stringify(memePublishResponse, null, 2),
//             prism.languages.json,
//             "json"
//           );
//
//           return send(socket, {
//             example: data.example,
//             html: raw(`
//               <h3>Response</h3>
//               ${explorerNotice}
//               <pre><code class="language-json">${renderedCode}</code></pre>
//             `),
//             message: "show result",
//             selector: `#example${data.example}-result`
//           });
//         } catch(memePublishError) {
//           send(socket, {
//             details: "Meme publish failed",
//             message: "notification",
//             type: "error"
//           });
//
//           return;
//         }
//       } catch(imageUploadError) {
//         send(socket, {
//           details: "Image upload failed",
//           message: "notification",
//           type: "error"
//         });
//
//         return;
//       }
//
//
//
//     //  R E S O L V E
//     //  E X A M P L E
//     case "resolve":
//       apiRequestMethod = "GET";
//       body.uri = claimAddress;
//       try {
//         const resolveResponse = await lbrytvAPI_resolve([claimAddress]);
//
//         if (socket) {
//           const renderedCode = prism.highlight(
//             JSON.stringify(resolveResponse, null, 2),
//             prism.languages.json,
//             "json"
//           );
//
//           return send(socket, {
//             example: data.example,
//             html: raw(`
//           <h3>Response</h3>
//           ${explorerNotice}
//           <pre><code class="language-json">${renderedCode}</code></pre>
//         `),
//             message: "show result",
//             selector: `#example${data.example}-result`
//           });
//         }
//       } catch(error) {
//         console.log(error);
//
//       }
//       break;
//
//
//
//     default:
//       break;
//   }
//
//
//
//   //  Q U E R Y
//   //  D A E M O N
//
//   const queryOptions = {
//     body: body,
//     json: true,
//     method: apiRequestMethod
//   };
//
//   const queryUrl = process.env.NODE_ENV === "development" ?
//     `http://localhost:5200/${resolveMethod}` :
//     `https://${process.env.DAEMON_URL}/${resolveMethod}`;
//
//   try {
//     const response = await fetch(queryUrl, queryOptions);
//
//     switch(true) {
//       case data.example === 3:
//       case response.body.result:
//       case response.body.result.txid:
//         explorerNotice = tipCompletionMessaging(response.body);
//         break;
//
//       default:
//         break;
//     }
//
//     if (socket) {
//       const renderedCode = prism.highlight(
//         JSON.stringify(response.body, null, 2),
//         prism.languages.json,
//         "json"
//       );
//
//       return send(socket, {
//         example: data.example,
//         html: raw(`
//           <h3>Response</h3>
//           ${explorerNotice}
//           <pre><code class="language-json">${renderedCode}</code></pre>
//         `),
//         message: "show result",
//         selector: `#example${data.example}-result`
//       });
//     }
//
//     // console.log("——");
//     // console.log(response.body.result[Object.keys(response.body.result)[0]]);
//     // console.log("——");
//
//     return response.body.result[Object.keys(response.body.result)[0]];
//   } catch(error) {
//     console.error(error);
//   }
// };



//  H E L P E R S

function memePublishMessaging(source) {
  return `
    <p class="playground__description success">
      Nicely done, you've published to <code>lbry://${source.result.lbrytech_claim_name}</code>.

      <br/><br/>

      To see Proof of Work (lol) that your meme is on the LBRY blockchain, <a href="https://explorer.lbry.com/tx/${source.result.outputs[0].txid}?address=${source.result.outputs[0].address}" rel="noopener noreferrer" target="_blank" title="Your meme, on our blockchain explorer">check it out</a> on our blockchain explorer! Please note that it may take a couple minutes for the transaction to be confirmed.

      <br/><br/>

      You can also check out your meme (once the transaction is confirmed) on <a href="https://open.lbry.com/${source.result.lbrytech_claim_name}#${source.result.outputs[0].claim_id}" rel="noopener noreferrer" target="_blank" title="Your meme, on LBRY">LBRY</a> or <a href="https://spee.ch/${source.result.outputs[0].claim_id}/${source.result.lbrytech_claim_name}" rel="noopener noreferrer" target="_blank" title="Your meme, on spee.ch">Spee.ch</a>!
    </p>

    <br/>
  `;
}

function tipCompletionMessaging(source) {
  return `
    <p class="playground__description success">
      If you want proof of the tip you just gave on behalf of LBRY, <a href="https://explorer.lbry.com/tx/${source.result.outputs[0].txid}" rel="noopener noreferrer" target="_blank" title="Your tip, on our blockchain explorer">check it out</a> on our blockchain explorer! Please note that it may take a couple minutes for the transaction to be confirmed.
    </p><br/>
  `;
}


function makeImageSourceSecure(url) {
  if (!url || !url.length)
    return url;

  const originalUrl = new URL(url);

  if (originalUrl.protocol !== "https")
    return `https://${originalUrl.host}${originalUrl.pathname}`;

  return originalUrl.href;
}

function generateContent(exampleNumber,selector) {
  if (exampleNumber === 1) {
    return lbrytvAPI_getTrending()
      .then(response => {
        const renderedContentCollection = [];
        const urlsToResolve = [];

        response.forEach(r => {
          urlsToResolve.push(r.canonical_url);
        });
        lbrytvAPI_resolve(urlsToResolve)
          .then(resolveResponse => {
            if (resolveResponse !== null) {
              const responses = Object.values(resolveResponse);

              for (const r in responses) {
                const part = responses[r];

                if (part.value && part.value.thumbnail && part.value.thumbnail.url) {
                  renderedContentCollection.push(`
                  <section class="playground-content__trend">
                    <figure
                      class="media__thumb"
                      data-action="choose claim"
                      data-claim-id="${part.claim_id}"
                      data-name=${part.name}
                      style="background-image: url(${makeImageSourceSecure(part.value.thumbnail.url)})">
                    </figure>

                    <div class="media__title">
                      ${part.value.title || "Untitled"}
                    </div>

                    <div class="media__subtitle">
                      ${part.signing_channel ? part.signing_channel.name : "Anon"}
                    </div>
                  </section>
                `);
                }
              }
            }
            renderedContentCollection.push(`
            <script>
              document.getElementById("playground-example-description").innerHTML = document.querySelector("[data-action='playground, example 1']").dataset.description
            <`+`/script>
`);
            document.querySelector(selector).innerHTML = renderedContentCollection.join("");
          })
          .catch(error => {
            console.error(error);
          });
      });
  }

  if (exampleNumber === 3) {
    const approvedUrls = [
      "LBRY#3db81c073f82fd1bb670c65f526faea3b8546720",
      "correlation-can-imply-causation#173412f5b1b7aa63a752e8832406aafd9f1ecb4e",
      "thanos-is-the-protagonist-how-infinity#2a7f5db2678177435b1dee6c9e38e035ead450b6",
      "epic-arcade-mode-duos-nickatnyte-molt#d81bac6d49b1f92e58c37a5f633a27a45b43405e",
      "political-correctness-a-force-for-good-a#b4668c0bd096317b44c40738c099b6618095e75f",
      "10-secrets-hidden-inside-famous-logos#007789cc45cbb4255cf02ba77cbf84ca8e3d7561",
      "ever-wonder-how-bitcoin-and-other#1ac47b8b3def40a25850dc726a09ce23d09e7009",
      "bankrupt-pan-am#784b3c215a6f06b663fc1aa292bcb19f29c489bb",
      "minecraft-in-real-life-iron-man#758dd6497cdfc401ae1f25984738d024d47b50af",
      "ethan-shows-kyle-warframe-skyvault#8a7401b88d5ed0376d98f16808194d4dcb05b284"
    ];
    const renderedContentCollection = [];

    lbrytvAPI_resolve(approvedUrls)
      .then(resolveResponse => {
        if (resolveResponse !== null) {
          const responses = Object.values(resolveResponse);

          for (const r in responses) {
            const part = responses[r];

            if (part.value && part.value.thumbnail.url) {
              renderedContentCollection.push(`
<section class="playground-content__trend">
<figure
  class="media__thumb"
  data-action="choose claim"
  data-claim-id="${part.claim_id}"
  data-name=${part.name}
  style="background-image: url(${makeImageSourceSecure(part.value.thumbnail.url)})">
</figure>

<div class="media__title">
  ${part.value.title || "Untitled"}
</div>

<div class="media__subtitle">
  ${part.signing_channel ? part.signing_channel.name : "Anon"}
</div>
</section>
`);
            }
          }
        }
        renderedContentCollection.push(`
<script>
document.getElementById("playground-example-description").innerHTML = document.querySelector("[data-action='playground, example 3']").dataset.description
<`+`/script>
`);
        document.querySelector(selector).innerHTML = renderedContentCollection.join("");
      })
      .catch(error => {
        console.error(error);
      });
  }
}

function generateMemeCreator(selector) {
  const images = [
    {
      alt: "Carl Sagan",
      // src: "https://spee.ch/4f6b953e605a602434246743fd246d3e1fd4f5fd/carlsagan2.jpg"
      src: "/assets/media/images/carlsagan2.jpg"
    },
    {
      alt: "Doge",
      // src: "https://spee.ch/2f90f2d91441a4d33d3d4eb82bdfc4c56ec742c7/doge-meme.jpg"
      src: "/assets/media/images/doge-meme.jpg"
    },
    {
      alt: "LBRY Logo With Green Background",
      // src: "https://spee.ch/40ac6818bbac87a208722bf4467653341d460908/lbry-green.png"
      src: "/assets/media/images/lbry-green.png"
    }
  ];

  const memePlaceholderData = {
    bottomLine: {
      placeholder: "Top line",
      value: "that I made"
    },
    description: {
      placeholder: "Description",
      value: "Check out this image I published to LBRY via lbry.tech"
    },
    topLine: {
      placeholder: "Top line",
      value: "This is an example meme"
    },
    title: {
      placeholder: "Title",
      value: "Dank Meme Supreme da Cheese"
    }
  };

  const renderedImages = [];

  for (const image of images)
    renderedImages.push(`<img alt="${image.alt}" class="playground-content__meme__canvas__thumbnail" src="${image.src}"/>`);

  const memeCreator = `
    <div class="playground-content__meme__canvas">
      <img alt="Base image for LBRY meme creator" id="base-image" style="height: 0; position: absolute; visibility: hidden;"/>
      <canvas id="meme-canvas" height="600" width="800">Unfortunately, it looks like canvas is <strong>not supported</strong> in your browser</canvas>

      ${renderedImages}
    </div>

    <form class="playground-content__meme__editor">
      <fieldset>
        <legend>Image Text</legend>

        <fieldset-section>
          <label for="meme-top-line">Top line</label>
          <input id="meme-top-line" name="meme-top-line" placeholder="${memePlaceholderData.topLine.placeholder}" spellcheck="false" type="text" value="${memePlaceholderData.topLine.value}" required/>
        </fieldset-section>

        <fieldset-section>
          <label for="meme-bottom-line">Bottom line</label>
          <input id="meme-bottom-line" name="meme-bottom-line" placeholder="${memePlaceholderData.bottomLine.placeholder}" spellcheck="false" type="text" value="${memePlaceholderData.bottomLine.value}" required/>
        </fieldset-section>
      </fieldset>

      <fieldset>
        <legend>Metadata</legend>

        <fieldset-section>
          <label for="meme-title">Title</label>
          <input id="meme-title" name="meme-title" placeholder="${memePlaceholderData.title.placeholder}" spellcheck="false" type="text" value="${memePlaceholderData.title.value}" required/>
        </fieldset-section>

        <fieldset-section>
          <label for="meme-description">Description</label>
          <textarea id="meme-description" name="meme-description" placeholder="${memePlaceholderData.description.placeholder}" spellcheck="false" type="text" required>${memePlaceholderData.description.value}</textarea>
        </fieldset-section>

        <fieldset-section>
          <label for="meme-language">Language</label>
          <select id="meme-language" name="meme-language">
            <option value="ar">Arabic</option>
            <option value="zh">Chinese (Mandarin)</option>
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="it">Italian</option>
            <option value="jp">Japanese</option>
            <option value="ru">Russian</option>
            <option value="es">Spanish</option>
            <option value="">Not specified</option>
          </select>
        </fieldset-section>

        <fieldset-section>
          <label for="meme-license">License</label>
          <select id="meme-license" name="meme-license" required>
            <option value="Public Domain">Public Domain</option>
            <option value="Creative Commons Attribution 4.0 International">Creative Commons Attribution 4.0 International</option>
            <option value="Creative Commons Attribution-ShareAlike 4.0 International">Creative Commons Attribution-ShareAlike 4.0 International</option>
            <option value="Creative Commons Attribution-NoDerivatives 4.0 International">Creative Commons Attribution-NoDerivatives 4.0 International</option>
            <option value="Creative Commons Attribution-NonCommercial 4.0 International">Creative Commons Attribution-NonCommercial 4.0 International</option>
            <option value="Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International</option>
            <option value="Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International">Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International</option>
            <option value="None">None</option>
          </select>
        </fieldset-section>

        <fieldset-section>
          <checkbox-element>
            <input id="meme-nsfw-flag" name="nsfw" type="checkbox">
            <label for="meme-nsfw-flag">NSFW</label>
            <checkbox-toggle/>
          </checkbox-element>

          <button data-action="upload image" class="button" type="button">Submit</button>
        </fieldset-section>
      </fieldset>
    </form>
  `;

  document.querySelector(selector).innerHTML = memeCreator;
}

onMounted(() => {
  generateContent(1,'#playground-loader');
  document.getElementById("playground-example-description").textContent = document.querySelector("[data-action='playground, example 1']").dataset.description;
});
</script>

<style>
/*!
 * Playground | Wrapper
 *
 * @class     .playground
 * @selector  {::before}
 * @selector  {::after}
 * @state     {.waiting}
**/

.playground {
  top: 1rem;
  border-top: 1px solid rgba(226, 229, 233, 0.3);
  position: relative;

  &.waiting::before {
    top: 0; right: 0;
    bottom: 0; left: 0;

    background-color: rgba(255,255,255, 0.7);
    content: "";
    cursor: progress;
    position: absolute;
    z-index: 5;
  }

  &::after {
    @include clearfix;
  }
}

/*!
 * Playground | Navigation
 *
 * @class     .playground-navigation
 *
 * @class     .playground-navigation__example
 * @selector  {::before}
 * @selector  {:last-of-type}
 * @state     {.active}
 * @state     {:hover}
**/

.playground-navigation {
  width: 100%;
  list-style-type: none;
  padding-top: 1.5rem;
  padding-bottom: 1rem;

  &::after {
    @include clearfix;
  }

  &__example {
    width: 33.333333%;
    cursor: pointer;
    float: left;
    position: relative;
    text-align: center;

    &::before {
      width: 100%; height: 2.5rem;
      top: -0.6rem; left: 0;

      content: "example " attr(data-example);
      font-size: 0.6rem;
      font-style: italic;
      line-height: 1.1;
      position: absolute;
      text-align: center;
      text-transform: uppercase;
    }

    &:not(.active) {
      &::before,
      button,
      span {
        color: rgb(226, 229, 233);
      }
    }

    &.active,
    &:hover {
      button {
        color: teal;
      }

      &::before,
      span {
        color: black;
      }
    }

    &.completed {
      &::after {
        width: 100%; height: 100%;
        top: 0; left: 0;

        background-color: rgba(255,255,255, 0.7);
        content: "✓";
        font-size: 3rem;
        line-height: 0.85;
        position: absolute;
        z-index: 10;
      }
    }

    &::before,
    button,
    span {
      transition: color 0.2s;
    }

    button {
      background-color: transparent;
      font-size: 1.25rem;
      font-weight: 600;
    }

    span {
      display: block;
      font-size: 1rem;
    }
  }
}



/*!
 * Playground | Content
 *
 * @class     .playground-content
 *
 * @class     .playground-content__meme
 * @selector  {::after}
 *
 * @class     .playground-content__meme__canvas
 *
 * @class     .playground-content__meme__canvas__thumbnail
 * @selector  {:last-of-type}
 * @state     {.selected}
 *
 * @class     .playground-content__meme__editor
 *
 * @class     .playground-content__trends
 * @selector  {::after}
 * @state     {:empty}
 *
 * @class     .playground-content__trend
 * @class     .playground-content__urlbar
**/

.playground-content {
  overflow-y: visible;
  padding-top: 1rem;
  padding-bottom: 1rem;

  .loader {
    @extend .__loading;

    &::after {
      content: "Processing request";
    }
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  pre {
    font-size: 1rem;
  }
}

.playground-content__meme {
  overflow-y: auto;
  position: relative;

  &::after {
    @include clearfix;
  }
}

.playground-content__meme__canvas {
  width: 48%;

  float: left;
  margin-right: 2%;
  position: relative;

  canvas {
    width: 100%; height: 100%;

    background-color: rgba(0,128,128, 0.3);
    margin-bottom: 1rem;
  }
}

.playground-content__meme__canvas__thumbnail { /*sass-lint:disable-line bem-depth // TODO: FIX THIS*/
  width: 5rem; height: 5rem;

  border-style: solid;
  border-width: 2px;
  cursor: pointer;
  margin-bottom: 1rem;
  object-fit: contain;
  object-position: center;

  &:not(:last-of-type) {
    margin-right: 1rem;
  }

  &:not(.selected) {
    border-color: transparent;
  }

  &.selected {
    border-color: black;
  }
}

.playground-content__meme__editor {
  width: 50%; min-height: 50vh;
  float: right;
  font-size: 1rem;
}

.playground-content__trends {
  @extend .media-grid;
  @include create-grid;

  min-width: 0; min-height: 0;
  grid-gap: var(--spacing-m);
  position: relative;

  &:empty {
    @extend .__loading;

    &::after {
      content: "Fetching content from LBRY";
    }
  }
}

.playground-content__trend {
  @extend .media;

  .media__subtitle {
    font-size: 0.8rem;
  }

  .media__thumb {
    background-image: linear-gradient(135deg, var(--lbry-teal-2), var(--lbry-blue-3) 100%);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    margin-bottom: 0.5rem;
  }

  .media__title {
    @include line-clamp(2.4rem, 2);
    font-size: 1rem;
    margin-bottom: 0.25rem;
  }
}

.playground-content__urlbar {
  height: 2.5rem;
  border: 1px solid teal;
  display: flex;
  margin-bottom: 1rem;

  button,
  input,
  span {
    float: left;
    vertical-align: middle;
  }

  button,
  span {
    height: 100%;
  }

  button {
    width: 6rem;
    text-transform: lowercase;
    z-index: 1;
  }

  input {
    width: calc(100% - 9.5rem);
    border: none;
    font-size: 1rem;

    &::placeholder {
      color: gray;
      opacity: 1;
    }
  }

  span {
    @include no-user-select;
    width: 3.5rem; height: 2.5rem;

    color: gray;
    cursor: default;
    font-size: 1rem;
    line-height: 2.4;
    text-align: right;
  }
}

/*!
 * Playground | Description
 *
 * @class .playground__description
**/

.playground__description {
  padding: 1rem;

  cursor: default;
  font-size: 1rem;
  line-height: 1.33;

  &:not(.success) {
    background-color: rgba(226, 229, 233, 0.3);
    text-align: center;
  }

  &.success {
    background-color: rgba(0,128,128, 0.3);

    strong {
      display: block;
      text-transform: uppercase;
    }
  }

  code {
    padding: 2px 5px;
    background-color: black;
    border-radius: 0.2rem;
    color: #fff;
    font-size: 0.8rem;
  }

  a {
    font-weight: 700;
  }
}
</style>

<template>
  <section class="playground">
    <ul class="playground-navigation">
      <li
        v-on:click="generateContent(1,'#playground-loader')"
        class="playground-navigation__example"
        data-action="playground, example 1"
        data-description="In this example, you can see what runs under the hood when selecting content to view in the LBRY app."
        data-example="1"
        data-success="<strong>Success</strong> You resolved a claim, which is a <em>fancy</em> way of saying you searched for a piece of content and got back all the metadata associated with it (if it exists)."
      >
        <button type="button">Resolve</button>
        <span>Get details of media (aka, "claim" metadata)</span>
      </li>

      <li
        v-on:click="generateMemeCreator('#playground-loader');"
        class="playground-navigation__example"
        data-action="playground, example 2"
        data-description="Sometimes you want to create content, not just consume it. In this example, you can create a meme and upload it to LBRY!"
        data-example="2"
        data-success="<strong>Meme-a-riffic</strong> You've just contributed to the growing expanse that is the meme industry. Where will your meme go next? YOU DECIDE!"
      >
        <button type="button">Publish</button>
        <span>Create a meme and upload it to the LBRY blockchain</span>
      </li>

      <li
        v-on:click="generateContent(3,'#playground-loader');"
        class="playground-navigation__example"
        data-action="playground, example 3"
        data-description="In the LBRY app, you can financially support your favorite creators by donating LBRY Credits (LBC). In this example, we are donating LBC in your stead."
        data-example="3"
        data-success="<strong>Kudos</strong> You've just supported a creator with LBC (LBRY Credits) with our own stash of LBC (you'd use your own IRL). You're basically saying, 'thanks for this great content, please continue!' and that's awesome. You're awesome."
      >
        <button type="button">Support</button>
        <span>Support creators on LBRY with a tip, on us!</span>
      </li>
    </ul>
    <p class="playground__description" id="playground-example-description"></p>
    <section class="playground-content">
      <div class="playground-content__urlbar" id="playground-url">
        <span>lbry://</span><input id="fetch-claim-uri" placeholder="&thinsp;Enter a LBRY address or select a video below" type="text"/>
        <button class="button" data-action="execute claim" type="button">Resolve</button>
      </div>

      <div class="playground-content__trends" id="playground-loader"></div>
      <div id="playground-results"></div>
    </section>
  </section>
</template>
