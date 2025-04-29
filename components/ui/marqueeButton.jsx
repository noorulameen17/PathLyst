import React from "react";
import { motion } from "framer-motion";

const MarqueeButton = () => {
    return (
        <motion.button
            initial={{ opacity: 0, backgroundColor: "rgba(209, 213, 219, 1)" }} // bg-gray-300
            whileHover={{ backgroundColor: "rgba(220, 220, 220, 1)" }}
            whileTap={{ backgroundColor: "rgba(255, 255, 255, 1)" }}
            whileInView={{ opacity: 1 }}
            transition={{ type: "tween", duration: 0.3 }}
            className="relative overflow-hidden rounded-full p-4 text-xl font-black uppercase text-black"
            tabIndex="0"
            style={{ width: '220px', maxWidth: '100%', transition: 'background-color 0.3s' }}
        >
            <span className="marquee-text whitespace-nowrap inline-block" style={{ display: 'inline-block', minWidth: '100%' }}>
                Get Started • Get Started • Get Started • 
                Get Started • Get Started • Get Started • 
            </span>
            <style jsx>{`
                .marquee-text {
                    display: inline-block;
                    white-space: nowrap;
                    animation: marquee 8s linear infinite;
                }
                @keyframes marquee {
                    0% {
                        transform: translateX(0%);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
            `}</style>
        </motion.button>
    );
};

export default MarqueeButton;