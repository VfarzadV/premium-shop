import { Scale, ShieldCheck, Truck, RotateCcw, Lock } from 'lucide-react';

export default function RulesPage() {
    const rules = [
        {
            id: 'general',
            icon: Scale,
            title: 'قوانین عمومی',
            content: 'تمامی اصول و رویه‌های پریمیوم‌شاپ منطبق با قوانین جمهوری اسلامی ایران، قانون تجارت الکترونیک و قانون حمایت از حقوق مصرف‌کننده است. ورود کاربران به وب‌سایت و استفاده از امکانات آن به معنای آگاه بودن و پذیرفتن شرایط و قوانین پریمیوم‌شاپ است.'
        },
        {
            id: 'privacy',
            icon: Lock,
            title: 'حریم خصوصی کاربران',
            content: 'پریمیوم‌شاپ به اطلاعات خصوصی اشخاصی که از خدمات سایت استفاده می‌کنند، احترام گذاشته و از آن محافظت می‌کند. ما متعهد می‌شویم در حد توان از حریم شخصی شما دفاع کنیم و در این راستا، تکنولوژی مورد نیاز برای هرچه مطمئن‌تر و امن‌تر شدن استفاده شما از سایت را توسعه دهیم.'
        },
        {
            id: 'shipping',
            icon: Truck,
            title: 'شرایط ارسال کالا',
            content: 'روز کاری به معنی روز شنبه تا پنج‌شنبه هر هفته، به استثنای تعطیلات عمومی در ایران است. تمامی سفارش‌های ثبت شده در طول روزهای کاری و اولین روز پس از تعطیلات پردازش می‌شوند. پریمیوم‌شاپ همواره در ارسال و تحویل کلیه سفارش‌های ثبت شده، نهایت دقت و تلاش خود را انجام می‌دهد.'
        },
        {
            id: 'return',
            icon: RotateCcw,
            title: 'رویه بازگرداندن کالا',
            content: 'آسودگی خاطر و رضایت‌مندی مشتریان همواره از اولویت‌های ما بوده است. شما می‌توانید تا ۷ روز پس از دریافت کالا، در صورت وجود نقص فنی یا مغایرت با اطلاعات سایت، کالا را با هماهنگی واحد پشتیبانی مرجوع نمایید. توجه داشته باشید که باز شدن پلمپ محصولات دیجیتال، امکان مرجوعی سلیقه‌ای را از بین می‌برد.'
        },
        {
            id: 'warranty',
            icon: ShieldCheck,
            title: 'شرایط گارانتی',
            content: 'کالاهایی که دارای گارانتی اصالت و سلامت فیزیکی هستند، شامل گارانتی‌های نرم‌افزاری یا خرابی‌های ناشی از استفاده نادرست نمی‌شوند. برای محصولات دارای گارانتی شرکتی، مسئولیت پاسخگویی و ارائه خدمات بر عهده شرکت گارانتی‌کننده درج شده روی جعبه محصول می‌باشد.'
        }
    ];

    return (
        <main className="w-[90%] lg:w-[70%] mx-auto py-10 md:py-16 min-h-screen">
            <div className="flex flex-col items-center justify-center text-center gap-4 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-2 shadow-sm">
                    <Scale className="w-8 h-8" />
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-text-main">قوانین و مقررات</h1>
                <p className="text-text-sec md:text-lg font-medium max-w-2xl leading-relaxed mt-2">
                    لطفاً پیش از ثبت سفارش و استفاده از خدمات پریمیوم‌شاپ، این صفحه را با دقت مطالعه فرمایید تا خریدی شفاف و مطمئن داشته باشید.
                </p>
            </div>
            <div className="flex flex-col gap-6">
                {rules.map((rule, index) => {
                    const Icon = rule.icon;
                    return (
                        <div
                            key={rule.id}
                            className="bg-bg-sec border border-stroke rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 animate-in fade-in slide-in-from-bottom-8 hover:border-primary/40 hover:shadow-md transition-all duration-300"
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            <div className="flex-shrink-0">
                                <div className="w-14 h-14 bg-bg-sec dark:bg-zinc-300 border border-stroke rounded-2xl flex items-center justify-center text-primary shadow-sm">
                                    <Icon className="w-6 h-6" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <h2 className="text-xl font-black text-text-main">{rule.title}</h2>
                                <p className="text-text-sec leading-loose text-justify text-sm md:text-base">
                                    {rule.content}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="mt-12 bg-primary/5 border border-primary/20 rounded-3xl p-6 text-center animate-in fade-in duration-700 delay-1000">
                <p className="text-sm font-bold text-primary">
                    ثبت سفارش در سایت به منزله مطالعه و تایید کامل این قوانین می‌باشد.
                </p>
            </div>
        </main>
    );
}