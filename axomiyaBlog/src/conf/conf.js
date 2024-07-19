const conf = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteKey: String(import.meta.env.VITE_APPWRITE_KEY_ID),
  appwriteProject: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteCollection: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  appwriteBucket: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};

export default conf;
