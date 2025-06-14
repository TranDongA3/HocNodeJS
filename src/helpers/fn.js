export const generateCode =(value) => {
    let output = '';
    value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9]/g, '').split('').forEach(element => {
        output += element.charAt(1)+element.charAt(0)
    });
    return output.toUpperCase()+value.length;
}

export const getPublicIdFromUrl = (url) => {
  // URL ví dụ: https://res.cloudinary.com/my_cloud_name/image/upload/books/abc123.jpg
  const parts = url.split('/'); // Tách URL thành mảng: ["https:", "", "res.cloudinary.com", "my_cloud_name", "image", "upload", "books", "abc123.jpg"]
  const fileNameWithExtension = parts[parts.length - 1]; // Lấy phần cuối: "abc123.jpg"
  const publicId = fileNameWithExtension.split('.')[0]; // Lấy "abc123" (bỏ phần mở rộng .jpg)
  const folder = parts[parts.length - 2]; // Lấy thư mục: "books"
  return `${folder}/${publicId}`; // Trả về public_id đầy đủ: "books/abc123"
};


