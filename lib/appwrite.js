import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.ankit.aora",
  projectId: "6645bba6002093faa8f7",
  storageId: "6645c1da0007addd4f67",
  databaseId: "6645be5c00331f691e0a",
  userCollectionId: "6645be69002d96749fe0",
  videoCollectionId: "6645be7d00290f043ec2",
};

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

const videos = [
  {
    title: "Get inspired to code",
    thumbnail:
      "https://cloud.appwrite.io/v1/storage/buckets/660d0e59e293896f1eaf/files/660eff632e9b02fe90e3/preview?width=2000&height=2000&gravity=top&quality=100&project=660d0e00da0472f3ad52",
    video:
      "https://cloud.appwrite.io/v1/storage/buckets/660d0e59e293896f1eaf/files/660f004955f51e7e3212/view?project=660d0e00da0472f3ad52",
    prompt:
      "Create a motivating AI driven video aimed at inspiring coding enthusiasts with simple language",
  },
  {
    title: "How AI Shapes Coding Future",
    thumbnail:
      "https://cloud.appwrite.io/v1/storage/buckets/660d0e59e293896f1eaf/files/660f0294e36d80abfaa9/preview?width=2000&height=2000&gravity=top&quality=100&project=660d0e00da0472f3ad52",
    video:
      "https://cloud.appwrite.io/v1/storage/buckets/660d0e59e293896f1eaf/files/660f032718759c0250ae/view?project=660d0e00da0472f3ad52",
    prompt: "Picture the future of coding with AI. Show AR VR",
  },
  {
    title: "Dalmatian's journey through Italy",
    thumbnail:
      "https://cloud.appwrite.io/v1/storage/buckets/660d0e59e293896f1eaf/files/660f08374f22dab6ed8a/preview?width=2000&height=2000&gravity=top&quality=100&project=660d0e00da0472f3ad52",
    video:
      "https://cloud.appwrite.io/v1/storage/buckets/660d0e59e293896f1eaf/files/660f093a03c20c7b2d12/view?project=660d0e00da0472f3ad52",
    prompt:
      "Create a heartwarming video following the travels of dalmatian dog exploring beautiful Italy",
  },
  {
    title: "Meet small AI friends",
    thumbnail:
      "https://cloud.appwrite.io/v1/storage/buckets/660d0e59e293896f1eaf/files/660f0aef261367cdc1f5/preview?width=2000&height=2000&gravity=top&quality=100&project=660d0e00da0472f3ad52",
    video:
      "https://cloud.appwrite.io/v1/storage/buckets/660d0e59e293896f1eaf/files/660f0b7855304dd4f802/view?project=660d0e00da0472f3ad52",
    prompt:
      "Make a video about a small blue AI robot blinking its eyes and looking at the screen",
  },
  {
    title: "Find inspiration in Every Line",
    thumbnail:
      "https://cloud.appwrite.io/v1/storage/buckets/660d0e59e293896f1eaf/files/660fd243473318c9dde1/preview?width=2000&height=2000&gravity=top&quality=100&project=660d0e00da0472f3ad52",
    video:
      "https://cloud.appwrite.io/v1/storage/buckets/660d0e59e293896f1eaf/files/660fd2cec9eb0298c9ac/view?project=660d0e00da0472f3ad52",
    prompt:
      "A buy working on his laptop that sparks excitement for coding, emphasizing the endless possibilities and personal growth it offers",
  },
  {
    title: "Japan's Blossoming temple",
    thumbnail:
      "https://cloud.appwrite.io/v1/storage/buckets/660d0e59e293896f1eaf/files/660fd5105ae00135f9f1/preview?width=2000&height=2000&gravity=top&quality=100&project=660d0e00da0472f3ad52",
    video:
      "https://cloud.appwrite.io/v1/storage/buckets/660d0e59e293896f1eaf/files/660fd543cc4792ba0611/view?project=660d0e00da0472f3ad52",
    prompt: "Create a captivating video journey through Japan's Sakura Temple",
  },
  {
    title: "A Glimpse into Tomorrow's VR World",
    thumbnail:
      "https://cloud.appwrite.io/v1/storage/buckets/660d0e59e293896f1eaf/files/660fd68ced2adc48ace2/preview?width=2000&height=2000&gravity=top&quality=100&project=660d0e00da0472f3ad52",
    video:
      "https://cloud.appwrite.io/v1/storage/buckets/660d0e59e293896f1eaf/files/660fd6b103374105e099/view?project=660d0e00da0472f3ad52",
    prompt: "An imaginative video envisioning the future of Virtual Reality",
  },
  {
    title: "A World where Ideas Grow Big",
    thumbnail:
      "https://cloud.appwrite.io/v1/storage/buckets/660d0e59e293896f1eaf/files/660fd7cb71f83e85ec89/preview?width=2000&height=2000&gravity=top&quality=100&project=660d0e00da0472f3ad52",
    video:
      "https://cloud.appwrite.io/v1/storage/buckets/660d0e59e293896f1eaf/files/660fd84ce8c5ff020f71/view?project=660d0e00da0472f3ad52",
    prompt:
      "Make a fun video about hackers and all the cool stuff they do with computers",
  },
];

// Register user
export async function createUser(email, password, username) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    throw new Error(error);
  }
}

// Sign In
export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Sign Out
export async function signOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

// Upload File
export async function uploadFile(file, type) {
  if (!file) return;

  const { mimeType, ...rest } = file;
  const asset = { type: mimeType, ...rest };

  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      asset
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

// Get File Preview
export async function getFilePreview(fileId, type) {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        appwriteConfig.storageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

// Create Video Post
export async function createVideoPost(form) {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"),
    ]);

    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId,
      }
    );

    return newPost;
  } catch (error) {
    throw new Error(error);
  }
}

// Get all video Posts
export async function getAllPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// Get video posts created by user
export async function getUserPosts(userId) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.equal("creator", userId)]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// Get video posts that matches search query
export async function searchPosts(query) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.search("title", query)]
    );

    if (!posts) throw new Error("Something went wrong");

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// Get latest created video posts
export async function getLatestPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}
