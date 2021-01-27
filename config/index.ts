export default {
    env: process.env.ENV || process.env.NODE_ENV || "development",
    isDev: process.env.NODE_ENV === "development",
    host: process.env.HOST || "localhost",
    port: process.env.PORT || 3000,
    DOMAIN: process.env.DOMAIN,
    FRONTURL: process.env.FRONTURL,
    BACKURL: process.env.BACKURL,
    meta: {
        title: "FutureSkill เรียนออนไลน์ ไม่จำกัดคอร์ส เรียนไม่อั้น ราคาเดียว",
        description:
            "แพลทฟอร์มเรียนรู้ทักษะธุรกิจ เทคโนโลยี และครีเอทีฟได้อย่างไม่จำกัด ทุกที่ทุกเวลา ในราคาที่คุ้มค่าและมีคุณภาพที่สุด Everyday learning for everyone, FutureSkill คือ แหล่งเรียนรู้ทักษะใหม่ๆไม่จำกัด คุ้มค่าและมีคุณภาพที่สุด",
        keywords: "",
        thumbnail: "/static/images/thumbnail.png",
    },
};
