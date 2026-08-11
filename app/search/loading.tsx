export default function Loading() {
    const skeletonCards = Array(12).fill(0);
    return (
        <main className="w-[90%] lg:w-[85%] mx-auto py-8 md:py-12 min-h-screen flex flex-col gap-8">
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-stroke shadow-sm flex items-center gap-4 animate-pulse">
                <div className="w-14 h-14 bg-stroke rounded-full shrink-0"></div>
                <div className="flex flex-col gap-3 w-full max-w-md">
                    <div className="w-3/4 h-7 bg-stroke rounded-lg"></div>
                    <div className="w-1/2 h-4 bg-stroke rounded-md"></div>
                </div>
            </div>
            <div className="w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6 mb-8">
                    {skeletonCards.map((_, index) => (
                        <div key={index} className="bg-secondary border border-stroke rounded-3xl p-4 flex flex-col shadow-sm">
                            <div className="w-full aspect-square rounded-2xl bg-bg-sec mb-4 animate-pulse"></div>
                            <div className="flex flex-col grow gap-3 animate-pulse">
                                <div className="flex justify-between items-center">
                                    <div className="w-1/3 h-3 bg-stroke rounded-full"></div>
                                    <div className="w-1/6 h-3 bg-stroke rounded-full"></div>
                                </div>
                                <div className="w-5/6 h-5 bg-stroke rounded-lg mt-2"></div>
                                <div className="w-1/2 h-5 bg-stroke rounded-lg"></div>
                                <div className="mt-auto pt-4 flex items-end justify-between border-t border-stroke/50">
                                    <div className="w-11 h-11 bg-stroke rounded-xl"></div>
                                    <div className="flex flex-col items-end gap-2">
                                        <div className="w-16 h-3 bg-stroke rounded-full"></div>
                                        <div className="w-24 h-6 bg-stroke rounded-lg"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}