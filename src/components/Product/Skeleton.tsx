import ContentLoader from "react-content-loader";
import styles from './styles.module.scss';
export const Skeleton = () => {
    return (
        <div className={styles.item}>
            <ContentLoader 
            speed={2}
            width={245}
            height={415}
            viewBox="0 0 245 415"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >

            
                <rect x="0" y="4" rx="5" ry="5" width="225" height="200" /> 
                <rect x="0" y="224" rx="5" ry="5" width="225" height="42" /> 
                <rect x="0" y="275" rx="5" ry="5" width="75" height="15" /> 
                <rect x="165" y="285" rx="5" ry="5" width="65" height="15" /> 
                <rect x="0" y="319" rx="5" ry="5" width="35" height="22" /> 
                <rect x="0" y="345" rx="5" ry="5" width="83" height="20" /> 
                <rect x="187" y="363" rx="5" ry="5" width="31" height="29" />
            </ContentLoader>
        </div>
        
    );
}