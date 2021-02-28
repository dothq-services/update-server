import React from 'react';

export const Content = ({
    children,
    center,
    centerHoriz,
    fullHeight,
    primary,
    bgStyle,
    visible
  }: {
    children: any
    center?: boolean
    centerHoriz?: boolean
    fullHeight?: boolean
    primary?: boolean
    bgStyle?: 'dot' | 'colour'
    visible?: boolean
}) => {
    return (
        <div className={`hero-container ${fullHeight ? `hero-vh` : ``} ${primary ? `hero-primary` : ``} ${bgStyle ? `hero-bg-${bgStyle}` : ``}`} style={{ display: visible ? 'none' : 'inherit' }}>
            <div
                className={`hero-content ${
                    centerHoriz ? `hero-center-horiz` : center ? `hero-center` : ``
                }`}
            >
                {children}
            </div>
        </div>
    )
}