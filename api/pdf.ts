import type { VercelRequest, VercelResponse } from "@vercel/node";

import { getDocument } from "../src/fetch";
import { renderDocument } from "../src/render";

const stripDotPdf = (path: string) => path.replace(/\.pdf$/, "");

// server.get("/:path*", async (req, res) => {
//   const api = await getDocument({
//     path: stripDotPdf(req.path),
//   });

//   if (!api.data.article) {
//     res.status(404).end("No Article Found");
//     return;
//   }
//   renderDocument(api.data.article, req.query, res);
// });

export default async function (req: VercelRequest, res: VercelResponse) {
  const { path, download } = req.query;

  const doc = await getDocument({ path: "/" + stripDotPdf(path as string) });

  console.log({ path });

  if (!doc.data.article) {
    res.status(404);
    return res.end("No Article found");
  }

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("X-Robots-Tag", "noindex");

  if (download) {
    const fileName = doc.data.article.meta.path
      .split("/")
      .filter(Boolean)
      .join("-");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${fileName}.pdf"`
    );
  }

  console.log("renderinnng");

  console.time("render");

  const buf = await renderDocument(doc.data.article, req.query);

  console.timeEnd("render");

  res.send(buf);
}
