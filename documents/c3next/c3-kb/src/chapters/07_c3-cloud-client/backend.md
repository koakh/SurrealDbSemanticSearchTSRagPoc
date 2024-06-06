# Backend Requests

All requests to backend should be in this file `src/util/http-client/backend.ts`

 - Lex Activator State
 - Set Cloud Contents
 - Set Cloud Apps
 - Set Structured Content
 - Set CloudContent Status
 - Update Cloud Content
 - Update Cloud App

## MongoDB

Interfaces
```ts
interface CloudContent {
  name: string;
  folderId: string;
  description: string;
  creator: string;
  type: number;
  isC3App: boolean;
}

interface CloudSummary {
  isAcknowledged: boolean;
  folder: string;
  stat: {
    state: string;
    percentage: number;
    globalBytes: number;
    needBytes: number;
    doneBytes: number;
    completion?: number; // cloud requires completion
  };
}
```