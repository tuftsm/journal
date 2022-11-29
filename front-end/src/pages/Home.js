import React from 'react';
import ReactDOM from 'react-dom/client';
import styles from './styles.module.css';
import background from './images/blackSky.jpg'
import { Image, View } from 'react';

function Home() {
    return(
        <div>
        <div>  
            <div className={styles.home}>
                <img 
                    style={{width:'100%'}}
                    src={background} alt="black sky"/>
            </div>
            <div className={styles.topRight}><em>All Your Records.<br/>All Together.</em></div>
        </div>
        <div className={styles.homefooter}>
            Utilized with <em>Github classroom</em>&emsp;&emsp;&emsp;
            All images licensed for use with <em>Creative Commons</em> licensing. The creator of this website does not claim to own any images.
        </div>
        </div>
    );
};


export default Home;