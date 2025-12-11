export default (context) => {

  const partialPath = /^\/resources\/.*/.test(context.req.path) ?
    context.req.path :
    context.req.path.slice(1);

  const path = `./documents/${partialPath}.md`;

  if (!fs.existsSync(path))
    return page404();

  const markdownFile = fs.readFileSync(path, "utf-8");
  const markdownFileDetails = fm(markdownFile);
  const title = markdownFileDetails.attributes.title;
  const description = markdownFileDetails.attributes.description || "";

  if (markdownFileDetails.attributes.meta) {
    const customMetadata = {};

    for (const key in markdownFileDetails.attributes.meta) {
      if (Object.prototype.hasOwnProperty.call(markdownFileDetails.attributes.meta, key)) {
        customMetadata[Object.keys(markdownFileDetails.attributes.meta[key])[0]] =
          markdownFileDetails.attributes.meta[key][Object.keys(markdownFileDetails.attributes.meta[key])[0]];
      }
    }

    context.var.lbry = customMetadata;
  }

  // below is evil, I just inherited it -- Jeremy
  context.var.lbry = {
    title: title,
    description: description
  };

  // below should be refactored into components
  let pageScript = "";

  switch(true) {
    case partialPath === "glossary":
      pageScript = renderClientScript("glossary-scripts");
      break;

    case partialPath === "overview":
      pageScript = renderClientScript("ecosystem-scripts");
      break;

    case partialPath === "playground":
      pageScript = renderClientScript("playground-scripts");
      break;

    default:
      break;
  }

  return html`
    <article class="page" itemtype="http://schema.org/BlogPosting">
      <header class="page__header">
        <div class="page__header-wrap">
          <div class="inner-wrap">
            <h1 class="page__header__title" itemprop="name headline">${title}</h1>
          </div>
        </div>
      </header>

      <section class="page__content" itemprop="articleBody">
        <div class="inner-wrap">
          ${markdown(path)}
          ${raw(pageScript)}
        </div>
      </section>
    </article>
  `;
};



function renderClientScript(clientScriptFileName) {
  return `
    <script>
      ${fs.readFileSync((`${process.cwd()}/app/components/client/${clientScriptFileName}.js`), "utf-8")}
    </script>
  `;
}

// import redirects from './app/data/redirects.json' assert { type: 'json' };

const redirects = JSON.parse(readFileSync('./app/data/redirects.json', 'utf8'));




//  E X P O R T

// export default async(context) => {
//
//
//   try {
//
//
//     return html`
//
//     `;
//   } catch(error) {
//     console.log(error);
//     const redirectUrl = redirects[context.req.url];
//
//     return html(await `
//       <article class="page" itemtype="http://schema.org/BlogPosting">
//         <header class="page__header">
//           <div class="page__header-wrap">
//             <div class="inner-wrap">
//               <h1 class="page__header__title" itemprop="name headline">404</h1>
//             </div>
//           </div>
//         </header>
//
//         <section class="page__content page__markup" itemprop="articleBody">
//           <div class="inner-wrap">
//             <p>Redirecting you to <strong>${redirectUrl}</strong></p>
//           </div>
//         </section>
//       </article>
//
//       <script>
//         setTimeout(() => {
//           window.location.href = "${redirectUrl}";
//         }, 2000);
//       </script>
//     `);
//   }
// };
