import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import styles from './Cards.module.css';

function Cards() {
    return (
        <div>
            <div className={`${styles.dMdFlex} ${styles.flexMdEqual} ${styles.w100} ${styles.myMd3} ${styles.psMd3}`}>
                <div className={`${styles.bgBodyTertiary} ${styles.meMd3} ${styles.pt3} ${styles.px3} ${styles.ptMd5} ${styles.pxMd5} ${styles.textCenter} ${styles.overflowHidden}`}>
                    <div className={`${styles.my3} ${styles.p3}`}>
                        <h2 className="display-5">Another headline</h2>
                        <p className="lead">And an even wittier subheading.</p>
                    </div>
                    <div className={`${styles.bgDark} ${styles.shadowSm} ${styles.mxAuto}`} style={{ width: '80%', height: '300px', borderRadius: '21px 21px 0 0' }}></div>
                </div>
                <div className={`${styles.textBgPrimary} ${styles.meMd3} ${styles.pt3} ${styles.px3} ${styles.ptMd5} ${styles.pxMd5} ${styles.textCenter} ${styles.overflowHidden}`}>
                    <div className={`${styles.my3} ${styles.py3}`}>
                        <h2 className="display-5">Another headline</h2>
                        <p className="lead">And an even wittier subheading.</p>
                    </div>
                    <div className={`${styles.bgBodyTertiary} ${styles.shadowSm} ${styles.mxAuto}`} style={{ width: '80%', height: '300px', borderRadius: '21px 21px 0 0' }}></div>
                </div>
            </div>
        </div>
    );
}
export default Cards;
