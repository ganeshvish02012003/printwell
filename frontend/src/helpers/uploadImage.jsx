const uploadImage = async (image) => {
    if (!image || !(image instanceof Blob)) {
        console.error("Invalid image file:", image);
        return { error: "Invalid image file" };
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "GPCI_final_job");
    // formData.append("folder", "GPCI_Manager/final_job"); // Nested folder structure


    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME_CLOUDINARY}/image/upload`, {
            method: "POST",
            body: formData,
        });

        const result = await response.json();
        console.log("Cloudinary Response:", result);

        if (!response.ok) {
            throw new Error(result.error?.message || "Image upload failed");
        }

        return result;
    } catch (error) {
        console.error("Upload error:", error);
        return { error: error.message };
    }
};

export default uploadImage



