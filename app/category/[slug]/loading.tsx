export default function Loading() {
    const skeletonCards = Array(12).fill(0);

    return (
        <main className="w-[90%] lg:w-[85%] mx-auto py-8 md:py-12 min-h-screen">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 bg-bg-sec p-6 rounded-3xl border border-stroke shadow-sm">
                <div className="w-full animate-pulse">
                    <div className="w-48 h-8 bg-stroke rounded-lg mb-3"></div>
                    <div className="w-64 h-4 bg-stroke rounded-md"></div>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto animate-pulse">
                    <div className="w-full md:w-28 h-11 bg-stroke rounded-xl"></div>
                    <div className="hidden md:block w-36 h-11 bg-stroke rounded-xl"></div>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-8">
                <aside className="hidden lg:flex flex-col gap-6 w-1/4 shrink-0">
                    <div className="bg-bg-sec border border-stroke rounded-3xl p-6 sticky top-6 shadow-sm animate-pulse h-100">
                        <div className="w-1/2 h-6 bg-stroke rounded-lg mb-8"></div>
                        <div className="w-full h-4 bg-stroke rounded-md mb-4"></div>
                        <div className="w-3/4 h-4 bg-stroke rounded-md mb-4"></div>
                        <div className="w-5/6 h-4 bg-stroke rounded-md mb-8"></div>
                        <div className="w-1/3 h-5 bg-stroke rounded-md mb-4"></div>
                        <div className="w-full h-4 bg-stroke rounded-md mb-4"></div>
                        <div className="w-2/3 h-4 bg-stroke rounded-md"></div>
                    </div>
                </aside>
                <div className="w-full lg:w-3/4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6 mb-8">
                        {skeletonCards.map((_, index) => (
                            <div key={index} className="bg-bg-sec border border-stroke rounded-3xl p-4 flex flex-col shadow-sm">
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
            </div>
        </main>
    );
}