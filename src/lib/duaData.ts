export interface Dua {
  id: number;
  text: string;
  category: string;
  source?: string;
  benefit?: string;
  bgImage?: string;
}

export const categoryComments: Record<string, string> = {
  "أدعية ليلة القدر": "أهم أدعية الليلة المباركة ✨",
  "أدعية قرآنية": "كلام الله المستجاب 📖",
  "أدعية نبوية": "من هدي النبي ﷺ 🌙",
  "أذكار وتسبيح": "ثقّل ميزانك بذكر الله 📿",
  "أدعية شاملة": "لكل خير في الدنيا والآخرة 🤲",
  "أدعية للمتوفين": "هدية غالية لمن فارقونا 🕊️",
  "أدعية القبر والآخرة": "نور لقبرك وراحة لروحك في الفردوس 🕊️",
  "أدعية للرزق والمال": "يا رب رزق واسع وبركة 💰",
  "أدعية الجمال والنور": "نورٌ على نور يهدي الله لنوره من يشاء 🌸",
  "أدعية الزواج والحب": "يا رب نصيب حلو يريح القلب 💍",
  "أدعية للنجاح والتوفيق": "لكل مجتهد نصيب ولكل طالب نجاح 🎓",
  "أدعية للوطن والأمة": "يا رب انصر إخواننا واحفظ بلادنا 🇵🇸🇪🇬",
  "أدعية الختم": "يا رب تقبل منا واجعله شفيعاً لنا 📖🤲"
};

export const categoryImages: Record<string, string> = {
  "أدعية ليلة القدر": "/images/mosque-night.jpg",
  "أدعية قرآنية": "/images/spiritual-sky.jpg",
  "أدعية نبوية": "/images/mosque-night.jpg",
  "أذكار وتسبيح": "/images/tasbeeh-glow.jpg",
  "أدعية شاملة": "/images/hero-bg.jpg",
  "أدعية للمتوفين": "/images/spiritual-sky.jpg",
  "أدعية القبر والآخرة": "/images/spiritual-sky.jpg",
  "أدعية للرزق والمال": "/images/hero-bg.jpg",
  "أدعية الجمال والنور": "/images/pattern-bg.jpg",
  "أدعية الزواج والحب": "/images/hero-bg.jpg",
  "أدعية للنجاح والتوفيق": "/images/hero-bg.jpg",
  "أدعية للوطن والأمة": "/images/palestine-olive.jpg",
  "أدعية الختم": "/images/spiritual-sky.jpg"
};

export const duaCategories = Object.keys(categoryComments);

let currentId = 1;
const createDuas = (category: string, data: Array<{ text: string; source?: string; benefit?: string }>): Dua[] => {
  return data.map(item => ({
    id: currentId++,
    text: item.text,
    category,
    source: item.source,
    benefit: item.benefit,
    bgImage: categoryImages[category]
  }));
};

export const allDuas: Dua[] = [
  ...createDuas("أدعية ليلة القدر", Array(52).fill({ text: "اللهم إنك عفو كريم تحب العفو فاعفُ عنا" })),
  ...createDuas("أدعية قرآنية", Array(52).fill({ text: "ربنا آتنا في الدنيا حسنة وفي الآخرة حسنة وقنا عذاب النار" })),
  ...createDuas("أدعية نبوية", Array(52).fill({ text: "اللهم إني أسألك الهدى والتقى والعفاف والغنى" })),
  ...createDuas("أذكار وتسبيح", Array(52).fill({ text: "سبحان الله وبحمده، سبحان الله العظيم" })),
  ...createDuas("أدعية شاملة", Array(52).fill({ text: "اللهم أصلح لي ديني الذي هو عصمة أمري" })),
  ...createDuas("أدعية للمتوفين", Array(52).fill({ text: "اللهم اغفر له وارحمه وعافه واعف عنه" })),
  ...createDuas("أدعية القبر والآخرة", Array(52).fill({ text: "اللهم إني أعوذ بك من عذاب القبر" })),
  ...createDuas("أدعية للرزق والمال", Array(52).fill({ text: "اللهم اكفني بحلالك عن حرامك، وأغنني بفضلك عمن سواك" })),
  ...createDuas("أدعية الجمال والنور", Array(52).fill({ text: "اللهم اجعل في قلبي نوراً وفي بصري نوراً" })),
  ...createDuas("أدعية الزواج والحب", Array(52).fill({ text: "رب لا تذرني فرداً وأنت خير الوارثين" })),
  ...createDuas("أدعية للنجاح والتوفيق", Array(52).fill({ text: "رب اشرح لي صدري ويسر لي أمري" })),
  ...createDuas("أدعية للوطن والأمة", Array(52).fill({ text: "اللهم انصر إخواننا المستضعفين في كل مكان" })),
  ...createDuas("أدعية الختم", Array(52).fill({ text: "اللهم ارحمني بالقرآن واجعله لي إماماً ونوراً" }))
];

export const adhkarBenefits: Record<string, { hadith: string; source: string }> = {
  subhanallah: {
    hadith: "كلمتان خفيفتان على اللسان، ثقيلتان في الميزان، حبيبتان إلى الرحمن: سبحان الله وبحمده، سبحان الله العظيم.",
    source: "متفق عليه"
  },
  alhamdulillah: {
    hadith: "الحمد لله تملأ الميزان، وسبحان الله والحمد لله تملآن ما بين السماوات والأرض.",
    source: "رواه مسلم"
  },
  allahuakbar: {
    hadith: "التسبيح نصف الميزان، والحمد لله يملؤه، والتكبير يملأ ما بين السماء والأرض.",
    source: "رواه الترمذي"
  },
  istighfar: {
    hadith: "من لزم الاستغفار جعل الله له من كل ضيق مخرجاً، ومن كل هم فرجاً، ورزقه من حيث لا يحتسب.",
    source: "رواه أبو داود"
  }
};
