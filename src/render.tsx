import React from "react";
import { renderToBuffer } from "@react-pdf/renderer";
import Document from "./components/Document";
import colors from "./lib/colors";

export const renderDocument = async (article, query) => {
  const format = article.meta.format || {};
  const formatMeta = format.meta || {};
  const formatTitle = formatMeta.title;
  const formatColor = formatMeta.color || colors[formatMeta.kind];
  const formatKind = formatMeta.kind;

  return renderToBuffer(
    <Document
      article={article}
      options={{
        formatTitle,
        formatColor,
        formatKind,
        images: query.images !== "0",
        size: query.size || "A4",
      }}
    />
  );
};
