'use client'
import { useEffect } from 'react';
import NavBar from '@/components/NavBar';
import ZoomParallax from '../components/ZoomParallax/index';
import Lenis from '@studio-freight/lenis';
import './globals.css'

export default function Home() {
    useEffect(() => {
        const lenis = new Lenis();

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
    }, []);

    return (
        <>
            <NavBar />
            <main>
                <ZoomParallax />
            </main>
        </>
    );
}