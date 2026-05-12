import * as admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    projectId: "designncode-c3380",
  });
}

const adminDb = admin.firestore();
const adminAuth = admin.auth();

export { adminDb, adminAuth };
