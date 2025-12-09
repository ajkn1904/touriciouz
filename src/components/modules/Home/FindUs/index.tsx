import dynamic from 'next/dynamic';

const FindUs = dynamic(() => import('./FindUs'), {
    // ssr: false
});

export default FindUs;