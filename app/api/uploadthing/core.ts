import { createUploadthing, type FileRouter } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  lessonVideo: f({
    video: { maxFileSize: "1GB" },
  })
    .middleware(() => {
      return {};
    })
    .onUploadComplete(({ file }) => {
      return { url: file.ufsUrl };
    }),

  lessonPDF: f({
    pdf: { maxFileSize: "16MB" },
  })
    .middleware(() => {
      return {};
    })
    .onUploadComplete(({ file }) => {
      return { url: file.ufsUrl };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
