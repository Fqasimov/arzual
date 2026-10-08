export const LANGS = ['az', 'en', 'ru'] as const
export type Lang = (typeof LANGS)[number]

export type LookId = 'midnight' | 'noir' | 'bordeaux' | 'olive'

type LookCopy = { name: string; cloth: string; note: string }
type Step = { title: string; text: string }
type Detail = { title: string; text: string }

export type Copy = {
  meta: { title: string; description: string }
  skip: string
  nav: { collection: string; details: string; process: string; contact: string; language: string }
  hero: { title: string; lead: string; cta: string; secondary: string; caption: string; madeIn: string }
  collection: { title: string; lead: string; ask: string; styled: string; looks: Record<LookId, LookCopy> }
  details: {
    title: string
    lead: string
    items: { pintuck: Detail; lace: Detail; jacquard: Detail; pearls: Detail }
  }
  process: { title: string; steps: [Step, Step, Step, Step] }
  contact: {
    title: string
    lead: string
    name: string
    occasion: string
    occasions: { wedding: string; engagement: string; evening: string; other: string }
    date: string
    optional: string
    message: string
    messagePlaceholder: string
    submit: string
    note: string
    nameError: string
    fallback: string
    instagram: string
  }
  footer: { madeIn: string; rights: string }
  wa: {
    look: (name: string) => string
    hello: string
    hero: string
    form: (f: { name: string; occasion: string; date: string; message: string }) => string
  }
}

const az: Copy = {
  meta: {
    title: 'Arzu Almazzadeh · Ölçüyə görə tikilən axşam paltarları',
    description: 'Atlaz, krujeva və əl işi detallar. Azərbaycanda, bir nəfər üçün tikilən axşam paltarları. WhatsApp-da konsultasiya.',
  },
  skip: 'Kolleksiyaya keçin',
  nav: { collection: 'Kolleksiya', details: 'Detallar', process: 'Sifariş', contact: 'Konsultasiya', language: 'Dil' },
  hero: {
    title: 'Ölçünüzə görə tikilən axşam paltarları',
    lead: 'Atlaz, krujeva və əl işi detallar. Hər paltar Azərbaycanda, bir nəfər üçün hazırlanır.',
    cta: 'WhatsApp-da yazın',
    secondary: 'Kolleksiyaya baxın',
    caption: 'Fil sümüyü atlaz, uzun qollu',
    madeIn: 'Azərbaycanda hazırlanıb',
  },
  collection: {
    title: 'Hər paltar öz rəngində',
    lead: 'Rəngi, parçanı və modeli konsultasiyada birlikdə seçirik.',
    ask: 'Bu paltar haqqında soruşun',
    styled: 'Gümüşü tuflilər və tünd mavi sırğalarla',
    looks: {
      midnight: {
        name: 'Gecə mavisi',
        cloth: 'Atlaz, krujeva',
        note: 'Atlaz üzərində nazik qatlar, çiyinlərdə və belin yanlarında krujeva.',
      },
      noir: {
        name: 'Qara',
        cloth: 'Atlaz, krujeva',
        note: 'Nazik qoşa bretelli, çəp kəsimli paltar. Açıq kürək krujeva ilə tamamlanır.',
      },
      bordeaux: {
        name: 'Bordo',
        cloth: 'Atlaz',
        note: 'Qolsuz, çəp kəsimli uzun paltar. Qol oyuqları volanla haşiyələnib.',
      },
      olive: {
        name: 'Zeytun',
        cloth: 'Jakkard atlaz, mirvari',
        note: 'Naxışlı jakkard atlaz, axan volan və ucunda mirvari salxımları olan bağlar.',
      },
    },
  },
  details: {
    title: 'Yaxından baxın',
    lead: 'Paltarı fotodan yox, toxunanda tanıyırsınız. Bu kadrlar ona ən yaxın olanıdır.',
    items: {
      pintuck: { title: 'Nazik qatlar', text: 'Paralel tikişlər parçanı çiyindən belə qədər formalaşdırır.' },
      lace: { title: 'Krujeva', text: 'Kirpikli kənarı olan krujeva açıq kürəyi çərçivələyir.' },
      jacquard: { title: 'Jakkard', text: 'Naxış parçanın içinə toxunub və işıqda görünür.' },
      pearls: { title: 'Mirvari bağlar', text: 'Bağların ucunda mirvari salxımları.' },
    },
  },
  process: {
    title: 'Paltar necə tikilir',
    steps: [
      { title: 'Yazışma', text: 'WhatsApp-da tədbiri, tarixi və istəklərinizi yazırsınız.' },
      { title: 'Ölçülər', text: 'Ölçüləriniz götürülür, parça və model birlikdə seçilir.' },
      { title: 'Primerka', text: 'Paltar tam oturana qədər sizin üzərinizdə tənzimlənir.' },
      { title: 'Təhvil', text: 'Hazır paltarı tədbirinizə vaxtında təhvil alırsınız.' },
    ],
  },
  contact: {
    title: 'Arzunuzu yazın',
    lead: 'Bir neçə sətir kifayətdir. Söhbəti WhatsApp-da davam etdirək.',
    name: 'Adınız',
    occasion: 'Tədbir',
    occasions: { wedding: 'Toy', engagement: 'Nişan', evening: 'Axşam tədbiri', other: 'Digər' },
    date: 'Tədbirin tarixi',
    optional: 'istəyə görə',
    message: 'Nə arzulayırsınız?',
    messagePlaceholder: 'Rəng, model, sevdiyiniz paltar…',
    submit: 'WhatsApp-da göndərin',
    note: 'Düymə WhatsApp-ı mesajınız hazır halda açır.',
    nameError: 'Adınızı yazın ki, sizə necə müraciət edəcəyimizi bilək.',
    fallback: 'WhatsApp açılmadısa, bu linkə toxunun',
    instagram: 'Instagram-da izləyin',
  },
  footer: { madeIn: 'Azərbaycanda hazırlanıb', rights: 'Bütün hüquqlar qorunur.' },
  wa: {
    look: (name) => `Salam! «${name}» paltarı ilə maraqlanıram.`,
    hello: 'Salam!',
    hero: 'Salam! Paltar sifarişi üçün konsultasiya istəyirəm.',
    form: ({ name, occasion, date, message }) =>
      [
        `Salam! Mənim adım ${name}.`,
        occasion && `Tədbir: ${occasion}.`,
        date && `Tarix: ${date}.`,
        message,
      ]
        .filter(Boolean)
        .join('\n'),
  },
}

const en: Copy = {
  meta: {
    title: 'Arzu Almazzadeh · Evening gowns, made to measure',
    description: 'Satin, lace and hand finishing. Evening gowns made in Azerbaijan, each for one woman. Consultations on WhatsApp.',
  },
  skip: 'Skip to the collection',
  nav: { collection: 'Collection', details: 'Details', process: 'Process', contact: 'Consultation', language: 'Language' },
  hero: {
    title: 'Evening gowns, cut to your measure',
    lead: 'Satin, lace and hand finishing. Every dress is made in Azerbaijan, for one woman.',
    cta: 'Write on WhatsApp',
    secondary: 'See the collection',
    caption: 'Ivory satin, long sleeves',
    madeIn: 'Made in Azerbaijan',
  },
  collection: {
    title: 'Each dress, its own colour',
    lead: 'Colour, cloth and cut are chosen together at the consultation.',
    ask: 'Ask about this dress',
    styled: 'Styled with silver pumps and blue drop earrings',
    looks: {
      midnight: {
        name: 'Midnight',
        cloth: 'Satin, lace',
        note: 'Pintucked satin, with lace at the shoulders and along the waist.',
      },
      noir: {
        name: 'Noir',
        cloth: 'Satin, lace',
        note: 'A bias-cut slip on fine double straps. The open back is finished in lace.',
      },
      bordeaux: {
        name: 'Bordeaux',
        cloth: 'Satin',
        note: 'Sleeveless and floor-length, cut on the bias, with ruffles framing the armholes.',
      },
      olive: {
        name: 'Olive',
        cloth: 'Jacquard satin, pearls',
        note: 'Patterned jacquard satin, a falling ruffle and ties finished with clusters of pearls.',
      },
    },
  },
  details: {
    title: 'Look closer',
    lead: 'You know a dress by touch, not by photograph. These frames are the closest we can get.',
    items: {
      pintuck: { title: 'Pintucks', text: 'Parallel stitched tucks shape the cloth from shoulder to waist.' },
      lace: { title: 'Lace', text: 'Eyelash-edged lace frames the open back.' },
      jacquard: { title: 'Jacquard', text: 'The pattern is woven into the cloth and shows in the light.' },
      pearls: { title: 'Pearl ties', text: 'Clusters of pearls weight the ends of the ties.' },
    },
  },
  process: {
    title: 'How a dress is made',
    steps: [
      { title: 'Conversation', text: 'Tell us on WhatsApp about the occasion, the date and what you have in mind.' },
      { title: 'Measurements', text: 'We take your measurements and choose the cloth and the cut together.' },
      { title: 'Fittings', text: 'The dress is adjusted on you until it sits exactly right.' },
      { title: 'Collection', text: 'You collect the finished dress in time for your occasion.' },
    ],
  },
  contact: {
    title: 'Tell us your wish',
    lead: 'A few lines are enough. We will carry on the conversation on WhatsApp.',
    name: 'Your name',
    occasion: 'Occasion',
    occasions: { wedding: 'Wedding', engagement: 'Engagement', evening: 'Evening event', other: 'Something else' },
    date: 'Date of the event',
    optional: 'optional',
    message: 'What do you have in mind?',
    messagePlaceholder: 'A colour, a shape, a dress you loved…',
    submit: 'Send on WhatsApp',
    note: 'The button opens WhatsApp with your message ready to send.',
    nameError: 'Add your name so we know who we are writing to.',
    fallback: "If WhatsApp didn't open, use this link",
    instagram: 'Follow on Instagram',
  },
  footer: { madeIn: 'Made in Azerbaijan', rights: 'All rights reserved.' },
  wa: {
    look: (name) => `Hello! I'd like to ask about the "${name}" dress.`,
    hello: 'Hello!',
    hero: "Hello! I'd like a consultation about a made-to-measure dress.",
    form: ({ name, occasion, date, message }) =>
      [`Hello! My name is ${name}.`, occasion && `Occasion: ${occasion}.`, date && `Date: ${date}.`, message]
        .filter(Boolean)
        .join('\n'),
  },
}

const ru: Copy = {
  meta: {
    title: 'Arzu Almazzadeh · Вечерние платья по меркам',
    description: 'Атлас, кружево и ручная отделка. Вечерние платья, сшитые в Азербайджане для одной женщины. Консультации в WhatsApp.',
  },
  skip: 'Перейти к коллекции',
  nav: { collection: 'Коллекция', details: 'Детали', process: 'Заказ', contact: 'Консультация', language: 'Язык' },
  hero: {
    title: 'Вечерние платья, сшитые по вашим меркам',
    lead: 'Атлас, кружево и ручная отделка. Каждое платье шьётся в Азербайджане для одной женщины.',
    cta: 'Написать в WhatsApp',
    secondary: 'Смотреть коллекцию',
    caption: 'Атлас цвета слоновой кости, длинные рукава',
    madeIn: 'Сделано в Азербайджане',
  },
  collection: {
    title: 'У каждого платья свой цвет',
    lead: 'Цвет, ткань и фасон мы выбираем вместе на консультации.',
    ask: 'Спросить об этом платье',
    styled: 'С серебристыми туфлями и синими серьгами',
    looks: {
      midnight: {
        name: 'Полночь',
        cloth: 'Атлас, кружево',
        note: 'Атлас с защипами, кружево на плечах и по бокам талии.',
      },
      noir: {
        name: 'Нуар',
        cloth: 'Атлас, кружево',
        note: 'Платье-комбинация кроя по косой на тонких двойных бретелях. Открытая спина отделана кружевом.',
      },
      bordeaux: {
        name: 'Бордо',
        cloth: 'Атлас',
        note: 'Длинное платье без рукавов, крой по косой, проймы обрамлены воланами.',
      },
      olive: {
        name: 'Олива',
        cloth: 'Жаккардовый атлас, жемчуг',
        note: 'Жаккардовый атлас с узором, струящийся волан и завязки с гроздьями жемчуга.',
      },
    },
  },
  details: {
    title: 'Взгляните ближе',
    lead: 'Платье узнают на ощупь, а не по фотографии. Эти кадры — самое близкое к этому.',
    items: {
      pintuck: { title: 'Защипы', text: 'Параллельные защипы формируют ткань от плеча до талии.' },
      lace: { title: 'Кружево', text: 'Кружево с ресничным краем обрамляет открытую спину.' },
      jacquard: { title: 'Жаккард', text: 'Узор вплетён в ткань и проявляется на свету.' },
      pearls: { title: 'Жемчужные завязки', text: 'Гроздья жемчуга на концах завязок.' },
    },
  },
  process: {
    title: 'Как создаётся платье',
    steps: [
      { title: 'Разговор', text: 'Расскажите в WhatsApp о событии, дате и своих пожеланиях.' },
      { title: 'Мерки', text: 'Мы снимаем мерки и вместе выбираем ткань и фасон.' },
      { title: 'Примерки', text: 'Платье подгоняется на вас, пока не сядет идеально.' },
      { title: 'Готово', text: 'Вы забираете готовое платье к вашему событию.' },
    ],
  },
  contact: {
    title: 'Расскажите о своём желании',
    lead: 'Достаточно пары строк. Продолжим разговор в WhatsApp.',
    name: 'Ваше имя',
    occasion: 'Событие',
    occasions: { wedding: 'Свадьба', engagement: 'Помолвка', evening: 'Вечернее мероприятие', other: 'Другое' },
    date: 'Дата события',
    optional: 'необязательно',
    message: 'Что вы хотите?',
    messagePlaceholder: 'Цвет, силуэт, платье, которое понравилось…',
    submit: 'Отправить в WhatsApp',
    note: 'Кнопка откроет WhatsApp с готовым сообщением.',
    nameError: 'Укажите имя, чтобы мы знали, как к вам обращаться.',
    fallback: 'Если WhatsApp не открылся, нажмите здесь',
    instagram: 'Мы в Instagram',
  },
  footer: { madeIn: 'Сделано в Азербайджане', rights: 'Все права защищены.' },
  wa: {
    look: (name) => `Здравствуйте! Хочу узнать о платье «${name}».`,
    hello: 'Здравствуйте!',
    hero: 'Здравствуйте! Хочу записаться на консультацию по пошиву платья.',
    form: ({ name, occasion, date, message }) =>
      [`Здравствуйте! Меня зовут ${name}.`, occasion && `Событие: ${occasion}.`, date && `Дата: ${date}.`, message]
        .filter(Boolean)
        .join('\n'),
  },
}

export const COPY: Record<Lang, Copy> = { az, en, ru }
