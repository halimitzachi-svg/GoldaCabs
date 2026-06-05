'use client';

import { sendGAEvent } from '@next/third-parties/google';
import React from 'react';

type AnalyticsLinkProps = {
    href: string;
    eventName: string;
    eventParams?: Record<string, any>;
    className?: string;
    children: React.ReactNode;
    target?: string;
    rel?: string;
};

export default function AnalyticsLink({
    href,
    eventName,
    eventParams = {},
    className,
    children,
    target,
    rel
}: AnalyticsLinkProps) {
    const handleClick = () => {
        sendGAEvent({
            event: eventName,
            value: eventParams
        });
    };

    return (
        <a
            href={href}
            onClick={handleClick}
            className={className}
            target={target}
            rel={rel}
        >
            {children}
        </a>
    );
}
