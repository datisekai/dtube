export const logo = 'https://i.imgur.com/4RhR8QG.png'
export const limitString = (string,limit) => {
    if(string.length > limit)
    {
        return string.slice(0,limit) + '...'
    }
    return string;
}

export const convertTime = (timeCreated) => {
    let periods = {
      "năm": 365 * 30 * 24 * 60 * 60 * 1000,
      "tháng": 30 * 24 * 60 * 60 * 1000,
      "tuần": 7 * 24 * 60 * 60 * 1000,
      "ngày": 24 * 60 * 60 * 1000,
      "giờ": 60 * 60 * 1000,
      "phút": 60 * 1000,
    };
  
    let diff = Date.now() - (+new Date(`${timeCreated}`));
    
    for (const key in periods) {
      if (diff >= periods[key]) {
        let result = Math.floor(diff / periods[key]);
        return `${result} ${result === 1 ? key : key} trước`;
      }
    }
  
    return "1 phút"
}

export const convertBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
     return reader.result;
    };
    return null;
}