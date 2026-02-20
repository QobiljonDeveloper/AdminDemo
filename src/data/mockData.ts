// =====================================================
// MOCK DATA FOR STANDALONE ADMIN DEMO
// =====================================================
// Bu fayl demo admin panel uchun barcha mock ma'lumotlarni o'z ichiga oladi
// Backend talab qilinmaydi - hamma narsa client-side ishlaydi

// Demo User
export const mockUser = {
    _id: 'demo-user-001',
    email: 'admin@gmail.com',
    firstName: 'Admin',
    lastName: 'Demo',
    role: 'SuperAdmin'
};

// Demo Credentials
export const DEMO_CREDENTIALS = {
    email: 'admin@gmail.com',
    password: 'admin123'
};

// Mock News Data
export const mockNews = [
    {
        _id: 'news-001',
        title: { uz: "O'zbekistonda yangi texnologik markazlar", ru: 'Новые технологические центры в Узбекистане', en: 'New Technology Centers in Uzbekistan' },
        subtitle: { uz: 'Innovatsion rivojlanish', ru: 'Инновационное развитие', en: 'Innovative Development' },
        description: { uz: "Toshkent shahrida 5 ta yangi IT markazlar ochildi. Bu markazlar yoshlarni dasturlash va texnologiyalarga o'rgatadi.", ru: 'В Ташкенте открылись 5 новых IT-центров. Эти центры обучают молодежь программированию и технологиям.', en: '5 new IT centers opened in Tashkent. These centers teach youth programming and technology.' },
        category: 'technology',
        date: '2026-01-28',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400',
        createdAt: '2026-01-28T10:00:00Z'
    },
    {
        _id: 'news-002',
        title: { uz: "Ta'lim sohasida islohotlar", ru: 'Реформы в сфере образования', en: 'Education Reforms' },
        subtitle: { uz: 'Yangi uslublar', ru: 'Новые методы', en: 'New Methods' },
        description: { uz: "Maktablarda zamonaviy o'qitish usullari joriy etilmoqda. 1000 dan ortiq o'qituvchi malaka oshirdi.", ru: 'В школах внедряются современные методы обучения. Более 1000 учителей повысили квалификацию.', en: 'Modern teaching methods are being implemented in schools. Over 1000 teachers have upgraded their qualifications.' },
        category: 'education',
        date: '2026-01-25',
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400',
        createdAt: '2026-01-25T14:30:00Z'
    },
    {
        _id: 'news-003',
        title: { uz: "Yoshlar forumi 2026", ru: 'Молодежный форум 2026', en: 'Youth Forum 2026' },
        subtitle: { uz: 'Kelajak liderlar uchun', ru: 'Для будущих лидеров', en: 'For Future Leaders' },
        description: { uz: "Samarqandda xalqaro yoshlar forumi bo'lib o'tdi. 50+ mamlakatdan 2000 dan ortiq delegatlar qatnashdi.", ru: 'В Самарканде прошел международный молодежный форум. Участвовало более 2000 делегатов из 50+ стран.', en: 'International youth forum was held in Samarkand. Over 2000 delegates from 50+ countries participated.' },
        category: 'events',
        date: '2026-01-22',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
        createdAt: '2026-01-22T09:00:00Z'
    },
    {
        _id: 'news-004',
        title: { uz: 'Sport muvaffaqiyatlari', ru: 'Спортивные достижения', en: 'Sports Achievements' },
        subtitle: { uz: "O'zbekiston sportchilari", ru: 'Узбекские спортсмены', en: 'Uzbek Athletes' },
        description: { uz: "Milliy terma jamoamiz xalqaro musobaqalarda 15 ta oltin medal bilan g'olib chiqdi.", ru: 'Наша национальная сборная победила на международных соревнованиях с 15 золотыми медалями.', en: 'Our national team won at international competitions with 15 gold medals.' },
        category: 'sport',
        date: '2026-01-20',
        image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400',
        createdAt: '2026-01-20T16:00:00Z'
    },
    {
        _id: 'news-005',
        title: { uz: 'Madaniy meros', ru: 'Культурное наследие', en: 'Cultural Heritage' },
        subtitle: { uz: "Tarixiy yodgorliklar", ru: 'Исторические памятники', en: 'Historical Monuments' },
        description: { uz: "Buxoro va Xivadagi tarixiy obidalarga restavratsiya ishlari muvaffaqiyatli yakunlandi.", ru: 'Реставрационные работы на исторических объектах Бухары и Хивы успешно завершены.', en: 'Restoration work on historical sites in Bukhara and Khiva has been successfully completed.' },
        category: 'culture',
        date: '2026-01-18',
        image: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=400',
        createdAt: '2026-01-18T11:00:00Z'
    },
    {
        _id: 'news-006',
        title: { uz: 'Iqtisodiy rivojlanish', ru: 'Экономическое развитие', en: 'Economic Development' },
        subtitle: { uz: "Investitsiya imkoniyatlari", ru: 'Инвестиционные возможности', en: 'Investment Opportunities' },
        description: { uz: "O'zbekistonga xorijiy investitsiyalar 40% ga oshdi. 200 dan ortiq yangi korxona ochildi.", ru: 'Иностранные инвестиции в Узбекистан выросли на 40%. Открыто более 200 новых предприятий.', en: 'Foreign investments in Uzbekistan have grown by 40%. Over 200 new enterprises have opened.' },
        category: 'economy',
        date: '2026-01-15',
        image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400',
        createdAt: '2026-01-15T10:00:00Z'
    }
];

// Mock Gallery Data
export const mockGallery = [
    {
        _id: 'gallery-001',
        title: { uz: 'Registon maydoni', ru: 'Площадь Регистан', en: 'Registan Square' },
        image: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=600',
        createdAt: '2026-01-28T10:00:00Z'
    },
    {
        _id: 'gallery-002',
        title: { uz: 'Toshkent shahar manzarasi', ru: 'Вид Ташкента', en: 'Tashkent City View' },
        image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=600',
        createdAt: '2026-01-27T14:00:00Z'
    },
    {
        _id: 'gallery-003',
        title: { uz: 'Chorsu bozori', ru: 'Базар Чорсу', en: 'Chorsu Bazaar' },
        image: 'https://images.unsplash.com/photo-1555217851-6141535bd771?w=600',
        createdAt: '2026-01-26T09:00:00Z'
    },
    {
        _id: 'gallery-004',
        title: { uz: "Ipak yo'li", ru: 'Шелковый путь', en: 'Silk Road' },
        image: 'https://images.unsplash.com/photo-1504598318550-17eba1008a68?w=600',
        createdAt: '2026-01-25T16:00:00Z'
    },
    {
        _id: 'gallery-005',
        title: { uz: "Amir Temur haykali", ru: 'Памятник Амиру Темуру', en: 'Amir Temur Monument' },
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
        createdAt: '2026-01-24T11:00:00Z'
    },
    {
        _id: 'gallery-006',
        title: { uz: "O'zbek milliy taomlar", ru: 'Узбекская кухня', en: 'Uzbek Cuisine' },
        image: 'https://images.unsplash.com/photo-1547496502-affa22d38842?w=600',
        createdAt: '2026-01-23T13:00:00Z'
    },
    {
        _id: 'gallery-007',
        title: { uz: "Navruz bayrami", ru: 'Праздник Навруз', en: 'Navruz Holiday' },
        image: 'https://images.unsplash.com/photo-1558618047-f4b511df1da9?w=600',
        createdAt: '2026-01-22T15:00:00Z'
    },
    {
        _id: 'gallery-008',
        title: { uz: "Atlas matolari", ru: 'Ткани Атлас', en: 'Atlas Fabrics' },
        image: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=600',
        createdAt: '2026-01-21T10:00:00Z'
    }
];

// Mock Opportunities Data
export const mockOpportunities = [
    {
        _id: 'opp-001',
        title: { uz: 'IT Junior dasturi', ru: 'Программа IT Junior', en: 'IT Junior Program' },
        description: { uz: "Bepul dasturlash kurslari. 3 oylik intensiv ta'lim. Python, JavaScript, React texnologiyalari.", ru: 'Бесплатные курсы программирования. 3-месячное интенсивное обучение. Технологии Python, JavaScript, React.', en: 'Free programming courses. 3-month intensive training. Python, JavaScript, React technologies.' },
        image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400',
        createdAt: '2026-01-28T10:00:00Z'
    },
    {
        _id: 'opp-002',
        title: { uz: 'Startup inkubator', ru: 'Стартап инкубатор', en: 'Startup Incubator' },
        description: { uz: "Yoshlar g'oyalarini hayotga tatbiq etish uchun $50,000 gacha moliyaviy yordam va mentorlik.", ru: 'Финансовая поддержка до $50,000 и менторство для реализации идей молодежи.', en: 'Financial support up to $50,000 and mentorship for implementing youth ideas.' },
        image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400',
        createdAt: '2026-01-26T10:00:00Z'
    },
    {
        _id: 'opp-003',
        title: { uz: 'Xorijda tahsil', ru: 'Обучение за рубежом', en: 'Study Abroad' },
        description: { uz: "100% grant bilan AQSh, Yevropa va Osiyo universitetlarida o'qish imkoniyati.", ru: '100% грант для обучения в университетах США, Европы и Азии.', en: '100% grant to study at universities in the USA, Europe, and Asia.' },
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400',
        createdAt: '2026-01-24T10:00:00Z'
    },
    {
        _id: 'opp-004',
        title: { uz: "Kasbiy rivojlanish", ru: 'Профессиональное развитие', en: 'Professional Development' },
        description: { uz: "Google, Microsoft, AWS sertifikatlari olish uchun bepul kurslar va imtihon to'lovlari.", ru: 'Бесплатные курсы и оплата экзаменов для получения сертификатов Google, Microsoft, AWS.', en: 'Free courses and exam fees for Google, Microsoft, AWS certifications.' },
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400',
        createdAt: '2026-01-22T10:00:00Z'
    },
    {
        _id: 'opp-005',
        title: { uz: "Biznes akselerator", ru: 'Бизнес акселератор', en: 'Business Accelerator' },
        description: { uz: "Kichik va o'rta biznes uchun 6 oylik akseleratsiya dasturi. Investorlar bilan uchrashuvlar.", ru: '6-месячная программа акселерации для малого и среднего бизнеса. Встречи с инвесторами.', en: '6-month acceleration program for small and medium businesses. Meetings with investors.' },
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400',
        createdAt: '2026-01-20T10:00:00Z'
    }
];

// Mock FAQ Data
export const mockFaq = [
    {
        _id: 'faq-001',
        question: { uz: "Renessans Uzbekistan nima?", ru: 'Что такое Renessans Uzbekistan?', en: 'What is Renessans Uzbekistan?' },
        answer: { uz: "Renessans Uzbekistan - bu O'zbekiston rivojlanishi uchun yangi imkoniyatlar yaratuvchi notijorat tashkilot. Biz yoshlar uchun ta'lim, kasbiy rivojlanish va tadbirkorlik imkoniyatlarini taqdim etamiz.", ru: 'Renessans Uzbekistan - некоммерческая организация, создающая новые возможности для развития Узбекистана. Мы предоставляем молодежи возможности образования, профессионального развития и предпринимательства.', en: 'Renessans Uzbekistan is a non-profit organization creating new opportunities for the development of Uzbekistan. We provide youth with education, professional development, and entrepreneurship opportunities.' },
        createdAt: '2026-01-28T10:00:00Z'
    },
    {
        _id: 'faq-002',
        question: { uz: "Qanday qilib a'zo bo'lish mumkin?", ru: 'Как стать членом?', en: 'How to become a member?' },
        answer: { uz: "Saytimizda ro'yxatdan o'ting, shaxsiy ma'lumotlaringizni va qiziqishlaringizni ko'rsating. 24 soat ichida tasdiqlash xabarini olasiz.", ru: 'Зарегистрируйтесь на сайте, укажите личные данные и интересы. В течение 24 часов получите подтверждение.', en: 'Register on our website, provide your personal information and interests. You will receive confirmation within 24 hours.' },
        createdAt: '2026-01-27T10:00:00Z'
    },
    {
        _id: 'faq-003',
        question: { uz: "Dasturlar bepulmi?", ru: 'Программы бесплатные?', en: 'Are the programs free?' },
        answer: { uz: "Ha, barcha asosiy dasturlar 100% bepul. Grantlar va homiylar orqali moliyalashtiriladi. Ba'zi premium xizmatlar uchun to'lov talab qilinishi mumkin.", ru: 'Да, все основные программы 100% бесплатные. Финансируются через гранты и спонсоров. За некоторые премиум-услуги может взиматься плата.', en: 'Yes, all core programs are 100% free. They are funded through grants and sponsors. Some premium services may require payment.' },
        createdAt: '2026-01-26T10:00:00Z'
    },
    {
        _id: 'faq-004',
        question: { uz: "Qaysi shaharlarda filiallar bor?", ru: 'В каких городах есть филиалы?', en: 'In which cities are there branches?' },
        answer: { uz: "Hozirda Toshkent (bosh ofis), Samarqand, Buxoro, Farg'ona, Navoiy va Nukus shaharlarida filiallarimiz mavjud. 2027 yilgacha barcha viloyatlarda ofis ochish rejamiz bor.", ru: 'В настоящее время у нас есть филиалы в Ташкенте (главный офис), Самарканде, Бухаре, Фергане, Навои и Нукусе. К 2027 году планируем открыть офисы во всех регионах.', en: 'We currently have branches in Tashkent (headquarters), Samarkand, Bukhara, Fergana, Navoi, and Nukus. We plan to open offices in all regions by 2027.' },
        createdAt: '2026-01-25T10:00:00Z'
    },
    {
        _id: 'faq-005',
        question: { uz: "Yosh chegarasi bormi?", ru: 'Есть ли возрастные ограничения?', en: 'Are there age restrictions?' },
        answer: { uz: "Asosan 16-35 yosh oralig'idagi yoshlar uchun mo'ljallangan. Ayrim dasturlar uchun yosh chegarasi farqlanishi mumkin. Mentorlik dasturiga 35+ yoshlilar ham qabul qilinadi.", ru: 'В основном предназначено для молодежи от 16 до 35 лет. Для некоторых программ возрастные ограничения могут отличаться. В программу менторства принимаются и лица старше 35 лет.', en: 'Primarily intended for youth between 16-35 years old. Age limits may vary for certain programs. People over 35 are also accepted into the mentorship program.' },
        createdAt: '2026-01-24T10:00:00Z'
    },
    {
        _id: 'faq-006',
        question: { uz: "Qanday bog'lanish mumkin?", ru: 'Как связаться?', en: 'How to contact?' },
        answer: { uz: "Telefon: +998 71 123 45 67, Email: info@renessans.uz, Telegram: @renessans_uz. Ish vaqti: Dushanba-Juma 09:00-18:00.", ru: 'Телефон: +998 71 123 45 67, Email: info@renessans.uz, Telegram: @renessans_uz. Рабочее время: Понедельник-Пятница 09:00-18:00.', en: 'Phone: +998 71 123 45 67, Email: info@renessans.uz, Telegram: @renessans_uz. Working hours: Monday-Friday 09:00-18:00.' },
        createdAt: '2026-01-23T10:00:00Z'
    }
];

// Mock Contact Data
export const mockContact = [
    {
        _id: 'contact-001',
        name: 'Alisher Karimov',
        email: 'alisher.k@gmail.com',
        phone: '+998 90 123 45 67',
        message: "IT Junior dasturi haqida ko'proq ma'lumot olmoqchiman. Qachon yangi guruh ochiladi?",
        createdAt: '2026-01-30T10:00:00Z',
        isRead: false
    },
    {
        _id: 'contact-002',
        name: 'Nodira Rahimova',
        email: 'nodira.r@mail.ru',
        phone: '+998 91 234 56 78',
        message: "Startup inkubatorga ariza topshirmoqchiman. Qanday hujjatlar kerak?",
        createdAt: '2026-01-29T14:30:00Z',
        isRead: true
    },
    {
        _id: 'contact-003',
        name: 'Jasur Yusupov',
        email: 'jasur.y@outlook.com',
        phone: '+998 93 345 67 89',
        message: "Samarqand filialiga tashrif buyurmoqchiman. Manzilni aniqroq ayta olasizmi?",
        createdAt: '2026-01-28T09:15:00Z',
        isRead: true
    }
];

// Mock Hero Data
export const mockHeroes = [
    {
        _id: 'hero-001',
        title: { uz: "O'zbekiston kelajagi uchun yangi imkoniyatlar", ru: 'Новые возможности для будущего Узбекистана', en: 'New opportunities for the future of Uzbekistan' },
        image: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=800',
        buttonLink: 'https://renessans.uz',
        order: 1,
        isActive: true,
        createdAt: '2026-01-28T10:00:00Z'
    },
    {
        _id: 'hero-002',
        title: { uz: 'Zamonaviy texnologiyalar va innovatsiyalar', ru: 'Современные технологии и инновации', en: 'Modern technologies and innovations' },
        image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800',
        buttonLink: null,
        order: 2,
        isActive: true,
        createdAt: '2026-01-25T14:00:00Z'
    },
    {
        _id: 'hero-003',
        title: { uz: "Ta'lim va rivojlanish dasturlari", ru: 'Программы образования и развития', en: 'Education and development programs' },
        image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800',
        buttonLink: 'https://renessans.uz/programs',
        order: 3,
        isActive: false,
        createdAt: '2026-01-20T09:00:00Z'
    }
];

// Mock Dashboard Stats
export const mockDashboardStats = {
    news: 127,
    gallery: 89,
    heroes: 3,
    opportunities: 34,
    faq: 56,
    messages: 243,
    recentActivity: [
        {
            _id: 'activity-001',
            action: 'CREATED' as const,
            module: 'News',
            itemTitle: "O'zbekistonda yangi texnologik markazlar",
            createdAt: '2026-01-30T14:30:00Z'
        },
        {
            _id: 'activity-002',
            action: 'UPDATED' as const,
            module: 'Gallery',
            itemTitle: 'Registon maydoni',
            createdAt: '2026-01-30T12:15:00Z'
        },
        {
            _id: 'activity-003',
            action: 'CREATED' as const,
            module: 'Opportunities',
            itemTitle: 'IT Junior dasturi',
            createdAt: '2026-01-30T10:00:00Z'
        },
        {
            _id: 'activity-004',
            action: 'DELETED' as const,
            module: 'FAQ',
            itemTitle: 'Eski savol',
            createdAt: '2026-01-29T16:45:00Z'
        },
        {
            _id: 'activity-005',
            action: 'UPDATED' as const,
            module: 'Contact',
            itemTitle: 'Asosiy ofis manzili',
            createdAt: '2026-01-29T11:30:00Z'
        },
        {
            _id: 'activity-006',
            action: 'CREATED' as const,
            module: 'News',
            itemTitle: "Ta'lim sohasida islohotlar",
            createdAt: '2026-01-28T15:20:00Z'
        }
    ]
};

// Helper function to generate unique IDs
export const generateId = () => `demo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
