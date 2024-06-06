import fs from 'fs'
import { nanoid } from 'nanoid';
import axios from 'axios';
// import * as fs from 'fs';
import { calcElapsedTime, fileRead, splitTextIntoChunks } from './utils';
import { Surreal, RecordId, Table } from "surrealdb.js";
import { mokeEmbeddingSearch } from "./constants";
import { embeddingModel, fetchEmbeddingWithRetry, ollamaClient } from './ollama-client';
import { chunkSize } from './constants';
import { chunkoverlap } from './constants';
import { limit } from './constants';
import { embeddingSearchTable } from './constants';

interface Documents {
  title: string;
  files: string[];
}

const documents: Array<Documents> = [
  // 76: IMPORTED OK
  // {
  //   title: 'C3-Manual',
  //   files: [
  //     'documents/c3next/c3-manual/src/activation.md',
  //     'documents/c3next/c3-manual/src/administration.md',
  //     'documents/c3next/c3-manual/src/dashboard.md',
  //     'documents/c3next/c3-manual/src/foundationlms.md',
  //     'documents/c3next/c3-manual/src/introduction.md',
  //     'documents/c3next/c3-manual/src/landing.md',
  //   ]
  // },
  // 371: IMPORTED OK
  // {
  //   title: 'C3-KB',
  //   files: [
  //     'documents/c3next/c3-kb/src/chapters/03_c3-system-core/devenv.md',
  //     'documents/c3next/c3-kb/src/chapters/03_c3-system-core/create-service-how-to.md',
  //     'documents/c3next/c3-kb/src/chapters/03_c3-system-core/links.md',
  //     'documents/c3next/c3-kb/src/chapters/03_c3-system-core/faq.md',
  //     'documents/c3next/c3-kb/src/chapters/chapter_01_introduction.md',
  //     'documents/c3next/c3-kb/src/chapters/20_c3-iso/c3-iso-file-structure.md',
  //     'documents/c3next/c3-kb/src/chapters/20_c3-iso/devenv.md',
  //     'documents/c3next/c3-kb/src/chapters/20_c3-iso/build-c3-iso.md',
  //     'documents/c3next/c3-kb/src/chapters/07_c3-cloud-client/devenv.md',
  //     'documents/c3next/c3-kb/src/chapters/07_c3-cloud-client/docker.md',
  //     'documents/c3next/c3-kb/src/chapters/07_c3-cloud-client/links.md',
  //     'documents/c3next/c3-kb/src/chapters/07_c3-cloud-client/backend.md',
  //     'documents/c3next/c3-kb/src/chapters/07_c3-cloud-client/faq.md',
  //     'documents/c3next/c3-kb/src/chapters/chapter_20_c3-iso.md',
  //     'documents/c3next/c3-kb/src/chapters/chapter_06_c3-lexactivator.md',
  //     'documents/c3next/c3-kb/src/chapters/02_installation/developers.md',
  //     'documents/c3next/c3-kb/src/chapters/02_installation/end-users.md',
  //     'documents/c3next/c3-kb/src/chapters/chapter_35_c3-faq.md',
  //     'documents/c3next/c3-kb/src/chapters/chapter_09_c3-updater.md',
  //     'documents/c3next/c3-kb/src/chapters/chapter_30_c3-kb.md',
  //     'documents/c3next/c3-kb/src/chapters/chapter_40_infraestructure.md',
  //     'documents/c3next/c3-kb/src/chapters/50_certificates/links-servers-and-certificates.md',
  //     'documents/c3next/c3-kb/src/chapters/05_c3-frontend/devenv.md',
  //     'documents/c3next/c3-kb/src/chapters/05_c3-frontend/links.md',
  //     'documents/c3next/c3-kb/src/chapters/05_c3-frontend/faq.md',
  //     'documents/c3next/c3-kb/src/chapters/50_company/links.md',
  //     'documents/c3next/c3-kb/src/chapters/28_c3-development-vm/devenv.md',
  //     'documents/c3next/c3-kb/src/chapters/chapter_05_c3-frontend.md',
  //     'documents/c3next/c3-kb/src/chapters/07_c3-lexactivator/cryptlex-lexactivator-license-rules.md',
  //     'documents/c3next/c3-kb/src/chapters/chapter_04_c3-backend.md',
  //     'documents/c3next/c3-kb/src/chapters/chapter_51_git.md',
  //     'documents/c3next/c3-kb/src/chapters/chapter_08_c3-cloudcontrol.md',
  //     'documents/c3next/c3-kb/src/chapters/chapter_41_c3-cloud-control.md',
  //     'documents/c3next/c3-kb/src/chapters/chapter_02_instalation.md',
  //     'documents/c3next/c3-kb/src/chapters/09_c3-updater/change-release-channel.md',
  //     'documents/c3next/c3-kb/src/chapters/09_c3-updater/releases-changelog/5.0.0.md',
  //     'documents/c3next/c3-kb/src/chapters/09_c3-updater/releases-changelog/5.0.1.md',
  //     'documents/c3next/c3-kb/src/chapters/09_c3-updater/rules.md',
  //     'documents/c3next/c3-kb/src/chapters/09_c3-updater/how-to-test-activate-license-on-non-supported-devices.md',
  //     'documents/c3next/c3-kb/src/chapters/09_c3-updater/devenv.md',
  //     'documents/c3next/c3-kb/src/chapters/09_c3-updater/create-a-new-cryptlex-release-files.md',
  //     'documents/c3next/c3-kb/src/chapters/09_c3-updater/how-to-test-new-release-update-cryptlex.md',
  //     'documents/c3next/c3-kb/src/chapters/09_c3-updater/releases-changelog.md',
  //     'documents/c3next/c3-kb/src/chapters/09_c3-updater/lock-down-release-versions.md',
  //     'documents/c3next/c3-kb/src/chapters/09_c3-updater/debug-update-process.md',
  //     'documents/c3next/c3-kb/src/chapters/09_c3-updater/links.md',
  //     'documents/c3next/c3-kb/src/chapters/09_c3-updater/faq.md',
  //     'documents/c3next/c3-kb/src/chapters/chapter_50_company.md',
  //     'documents/c3next/c3-kb/src/chapters/chapter_03_c3-system-core.md',
  //     'documents/c3next/c3-kb/src/chapters/04_c3-backend/mongodb.md',
  //     'documents/c3next/c3-kb/src/chapters/04_c3-backend/devenv.md',
  //     'documents/c3next/c3-kb/src/chapters/04_c3-backend/links.md',
  //     'documents/c3next/c3-kb/src/chapters/04_c3-backend/howtos/howto-nestjs-jest-test.md',
  //     'documents/c3next/c3-kb/src/chapters/04_c3-backend/howtos.md',
  //     'documents/c3next/c3-kb/src/chapters/04_c3-backend/faq.md',
  //     'documents/c3next/c3-kb/src/chapters/chapter_36_known-errors.md',
  //     'documents/c3next/c3-kb/src/chapters/06_c3-lexactivator/cryptlex-lexactivator-bridge.md',
  //     'documents/c3next/c3-kb/src/chapters/06_c3-lexactivator/cryptlex-lexactivator-bridge/faq.md',
  //     'documents/c3next/c3-kb/src/chapters/06_c3-lexactivator/c3-lexactivator-api/devenv.md',
  //     'documents/c3next/c3-kb/src/chapters/06_c3-lexactivator/c3-lexactivator-api/faq.md',
  //     'documents/c3next/c3-kb/src/chapters/06_c3-lexactivator/cryptlex-lexactivator-cli/faq.md',
  //     'documents/c3next/c3-kb/src/chapters/06_c3-lexactivator/cryptlex-lexactivator-importer/faq.md',
  //     'documents/c3next/c3-kb/src/chapters/06_c3-lexactivator/cryptlex-lexactivator-importer.md',
  //     'documents/c3next/c3-kb/src/chapters/06_c3-lexactivator/c3-lexactivator-api.md',
  //     'documents/c3next/c3-kb/src/chapters/06_c3-lexactivator/cryptlex-lexactivator-cli.md',
  //     'documents/c3next/c3-kb/src/chapters/06_c3-lexactivator/links.md',
  //     'documents/c3next/c3-kb/src/chapters/chapter_07_c3-cloud-client.md',
  //     'documents/c3next/c3-kb/src/chapters/chapter_28_c3-development-vm.md',
  //     'documents/c3next/c3-kb/src/chapters/08_c3-cloudcontrol/sync-server.md',
  //     'documents/c3next/c3-kb/src/chapters/08_c3-cloudcontrol/c3cloudcontrol.md',
  //     'documents/c3next/c3-kb/src/chapters/08_c3-cloudcontrol/deploy-c3cloud.md',
  //     'documents/c3next/c3-kb/src/chapters/08_c3-cloudcontrol/deploy-ceph.md',
  //     'documents/c3next/c3-kb/src/chapters/08_c3-cloudcontrol/devenv_v3.md',
  //     'documents/c3next/c3-kb/src/chapters/08_c3-cloudcontrol/deploy-mongo.md',
  //     'documents/c3next/c3-kb/src/chapters/08_c3-cloudcontrol/devenv_v2.md',
  //     'documents/c3next/c3-kb/src/chapters/08_c3-cloudcontrol/deploy.md',
  //     'documents/c3next/c3-kb/src/chapters/08_c3-cloudcontrol/ceph.md',
  //     'documents/c3next/c3-kb/src/chapters/40_infraestructure/socket-server.md',
  //     'documents/c3next/c3-kb/src/chapters/40_infraestructure/links-server.md',
  //     'documents/c3next/c3-kb/src/chapters/40_infraestructure/auto-update-certificates.md',
  //     'documents/c3next/c3-kb/src/chapters/40_infraestructure/global-ssh-key.md',
  //   ]
  // },
  {
    title: 'Book: Alice no Pais das Maravilhas 9 a 12 anos',
    files: [
      'documents/flavia/Alice no Pais das Maravilhas 9 a 12 anos.txt',
    ]
  },
];

// db client
const db = new Surreal();
// Connect to the database
await db.connect("http://127.0.0.1:8000/rpc");

// Select a specific namespace / database
await db.use({
  namespace: "test",
  database: "test"
});

// Signin as a namespace, database, or root user
await db.signin({
  username: "root",
  password: "root",
});

// Array.forEach does not support async/await natively.
// books.forEach(async (e) => {
// fix using Promise.all(chunks.map
const processDocuments = async () => {
  for (const e of documents) {
    const startDate = new Date();
    let totalChunksInDocument = 0;

    console.log(`${e.title}`);

    for (const d of e.files) {
      if (fs.existsSync(d)) {
        const buffer = fileRead(d);
        const chunks = splitTextIntoChunks(buffer.toString(), chunkSize, chunkoverlap);
        // increment document total chunks
        totalChunksInDocument += chunks.length;
        // console.log(`${e.title}/${d} chunks length: [${chunks.length}]`);

        await Promise.all(chunks.map(async (c, index) => limit(async () => {
          // prevent `ResponseError: server busy, please try again. maximum pending requests exceeded`
          const embedding: number[] | undefined = await fetchEmbeddingWithRetry(c, embeddingModel);
          const [created] = await db.create(embeddingSearchTable, {
            documentId: nanoid(8),
            title: e.title,
            file: d,
            chunkIndex: index,
            chunkText: c,
            embedding,
          });
          console.log(`  created: [${created.id}], '${created.title}', from file: ${d}, chunkIndex: ${created.chunkIndex}/${chunks.length}, totalChunksInDocument: ${totalChunksInDocument}`);
        })));
      } else {
        console.log(`skip [${d}], missing file...`);
      }
    }
    // comment `for (const d of e.files) {` block and uncomment bellow line to get totalChunksInDocument
    // console.log(`  totalChunksInDocument: [${totalChunksInDocument}] in ${e.title}`);

    const elapsedTime = calcElapsedTime(startDate, new Date());

    console.log(`    created '${e.title}', elapsedTime: ${JSON.stringify(elapsedTime)}`);
  }
};

await processDocuments();

await db.invalidate();
process.exit(0);