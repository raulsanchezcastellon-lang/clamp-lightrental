import { GridFSBucket, MongoClient, type Db, type GridFSBucketReadStream } from "mongodb";
import { Readable } from "stream";

const DATABASE_URL = process.env.DATABASE_URL;
const BUCKET_NAME = "productImages";

let clientPromise: Promise<MongoClient> | undefined;

function getDatabaseName(url: string) {
  const pathname = new URL(url).pathname.replace("/", "");

  if (!pathname) {
    throw new Error("DATABASE_URL must include a database name for uploads.");
  }

  return pathname;
}

async function getDb(): Promise<Db> {
  if (!DATABASE_URL) {
    throw new Error("DATABASE_URL is required for image uploads.");
  }

  if (!clientPromise) {
    clientPromise = new MongoClient(DATABASE_URL).connect();
  }

  const client = await clientPromise;
  return client.db(getDatabaseName(DATABASE_URL));
}

function getBucket(db: Db) {
  return new GridFSBucket(db, { bucketName: BUCKET_NAME });
}

export function sanitizeImageName(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9.-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function saveUploadToGridFs(
  fileName: string,
  buffer: Buffer,
  contentType: string
) {
  const db = await getDb();
  const bucket = getBucket(db);

  await new Promise<void>((resolve, reject) => {
    const uploadStream = bucket.openUploadStream(fileName, {
      metadata: {
        contentType,
        uploadedAt: new Date(),
      },
    });

    uploadStream.on("error", reject);
    uploadStream.on("finish", () => resolve());
    uploadStream.end(buffer);
  });
}

export async function findUploadByName(fileName: string) {
  const db = await getDb();
  const bucket = getBucket(db);
  const files = await bucket.find({ filename: fileName }).sort({ uploadDate: -1 }).limit(1).toArray();

  if (!files[0]) {
    return null;
  }

  return {
    file: files[0],
    stream: bucket.openDownloadStream(files[0]._id),
  };
}

export function gridFsStreamToWebStream(stream: GridFSBucketReadStream) {
  return Readable.toWeb(stream) as ReadableStream<Uint8Array>;
}
