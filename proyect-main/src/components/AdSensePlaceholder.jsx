import React, { useEffect } from 'react';

// When you have your Google AdSense account approved,
// you should change the "data-ad-client" (ca-pub-XXXXX) 
// and the "data-ad-slot" for the numbers Google gives you.
export const AdSensePlaceholder = ({ type = 'horizontal', adClient = 'ca-pub-XXXXXXXXXXXXXXXX', adSlot = 'XXXXXXXXXX' }) => {
    useEffect(() => {
        try {
            if (window.adsbygoogle && process.env.NODE_ENV === "production") {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch (err) {
            console.error('Error initializing AdSense:', err);
        }
    }, []);

    // Local Environment (Development): Shows the "Placeholder" box so you know where it goes.
    if (process.env.NODE_ENV !== "production") {
        return (
            <div className={`w-full bg-slate-100 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center p-4 my-6 text-slate-400 ${type === 'horizontal' ? 'h-32' : 'h-64'}`}>
                <span className="text-xs font-bold uppercase tracking-wider mb-1">Subtle Advertising Space</span>
                <span className="text-[10px] text-slate-400 text-center max-w-md">
                    (Here the Google ad will appear in Production)
                </span>
            </div>
        );
    }

    // Production Environment: Shows the real ad
    return (
        <div className={`w-full flex justify-center overflow-hidden my-6 ${type === 'horizontal' ? 'min-h-[128px]' : 'min-h-[256px]'}`}>
            <ins
                className="adsbygoogle"
                style={{ display: "block", width: "100%" }}
                data-ad-client={adClient}
                data-ad-slot={adSlot}
                data-ad-format={type === 'horizontal' ? 'auto' : 'rectangle'}
                data-full-width-responsive="true"
            ></ins>
        </div>
    );
};
