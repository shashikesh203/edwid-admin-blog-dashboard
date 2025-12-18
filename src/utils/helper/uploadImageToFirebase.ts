import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../lib/firebase";

export const uploadImageToFirebase = async (file: File) => {
    console.log("Uploading file to Firebase:", import.meta.env.STORAGE_BUCKET);
    const imageRef = ref(
        storage,
        `posts/${Date.now()}-${file.name}`
    );

    await uploadBytes(imageRef, file);
    return await getDownloadURL(imageRef);
};
