
export const formatNumber = (number) => {
    if (number >= 1e9) {
        return (number / 1e9).toFixed(1) + "B";
      } else if (number >= 1e6) { 
        return (number / 1e6).toFixed(1) + "Tr";
      } else if (number >= 1e3) {
        return (number / 1e3).toFixed(1) + "k";
      } else {
        return number;
      }
}

export const convertToHourMinute = (timeString) => {
    // Tách giờ, phút và giây từ chuỗi thời gian
    const [hour, minute, second] = timeString.split(":").map(Number);
  
    // Chuyển đổi thành định dạng "X giờ Y phút"
    let result = "";
    if (hour > 0) {
      result += hour + " giờ ";
    }
    if (minute > 0) {
      result += minute + " phút";
    }
  
    return result;
  }