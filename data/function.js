const fs = require('fs');
const data = require('./data.json');

// Hàm xử lý
const catchuoi = (data) => {
  for (const category in data) {
    data[category] = data[category].map(book => {
      return {
        ...book,
        bookPrice: book.bookPrice.split('£')[0]  // chỉ lấy phần giá trước dấu £
      };
    });
  }

  // Ghi lại file JSON đã xử lý
  fs.writeFileSync('./cleaned-data.json', JSON.stringify(data, null, 2), 'utf-8');
  console.log('✅ Đã xử lý xong và lưu vào cleaned-data.json');
};

// Gọi hàm
catchuoi(data);
