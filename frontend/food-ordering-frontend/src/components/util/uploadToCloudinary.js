export const uploadImageToCloudinary = async (file) => {
    const uploadData = new FormData();
    uploadData.append("file", file);

    // Đã điền tên preset và cloud name của bạn
    uploadData.append("upload_preset", "food_preset");
    uploadData.append("cloud_name", "dsykdognr");

    // Đã thay cloud name vào link API
    const res = await fetch(`https://api.cloudinary.com/v1_1/dsykdognr/image/upload`, {
        method: "post",
        body: uploadData,
    });

    const fileData = await res.json();
    return fileData.url;
};