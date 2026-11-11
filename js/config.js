/* =========================================================
   CẤU HÌNH CỬA HÀNG — sửa thông tin của bạn tại đây
   ========================================================= */
const SHOP = {
  name: "NOVADRINK",
  phone: "0942527856",
  email: "hoavinhnguyen2005@gmail.com",
  address: "Cập nhật địa chỉ cửa hàng",
  hours: "6:00 – 21:00, cả tuần",

  // Mạng xã hội & link gửi bill
  facebook: "https://www.facebook.com/profile.php?id=61596088603344",
  zalo: "https://zalo.me/0942527856",
  messenger: "https://m.me/hoavinh.nguyen.7547",

  // Thông tin chuyển khoản (mã QR tạo tự động qua VietQR)
  bank: {
    bankId: "BIDV",                // mã ngân hàng: MB, VCB, TCB, ACB, BIDV, ICB (VietinBank), TPB, VPB...
    bankName: "BIDV - PGD Phùng Chí Kiên",
    accountNo: "2680457184",      // số tài khoản
    accountName: "NGUYEN HOA VINH", // tên chủ tài khoản (viết hoa, không dấu)
  },
};

// Danh sách sản phẩm (id, tên, giá, ảnh)
const PRODUCTS = [
  { id: "chanh-giai-nhiet", name: "Trà chanh giải nhiệt", price: 12000, img: "images/tra-chanh.png", desc: "Chanh tươi vắt tại chỗ, trà xanh thơm nhẹ, ít ngọt." },
  { id: "tac-nhiet-doi",    name: "Trà tắc nhiệt đới",    price: 12000, img: "images/tra-tac.png",   desc: "Tắc miền Tây, chua dịu, mát lạnh cả ngày." },
  { id: "dao-cam-sa",       name: "Trà đào cam sả",       price: 12000, img: "images/tra-dao.png",   desc: "Đào miếng ngọt mềm, cam tươi và sả thơm lừng." },
  { id: "chanh-con-ca",     name: "Trà chanh con cá",     price: 15000, img: "images/tra-ca.png",    desc: "Món đặc biệt của quán: trà chanh vàng óng, thả thạch cá dẻo vui mắt." },
];

const formatVND = (n) => n.toLocaleString("vi-VN") + "đ";
