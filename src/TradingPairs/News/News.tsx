import { Link } from 'react-router-dom';
import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import toast, {Toaster} from 'react-hot-toast'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import './News.css';

interface LatestNewsProps {
    assetCode: string | undefined;
}

const api_key:string = 'rXb9lgai4F4FlP6FMNJvN9lCTFCVayC880JxPoo5';

const formatDate = (timestamp: number):string => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' });

    return formattedDate;
}

const LatestNews: React.FC<LatestNewsProps> = ({ assetCode }) => {    
    const {data: newsFeedData, error, isLoading} = useQuery(
        ['cryptoAssetNewsFeed', assetCode],
        () => fetch(`https://api.coinfeeds.io/coins/${assetCode}/news?symbol=true`, {
            headers: {
                'x-api-key': api_key
            }
            
        })
        .then((res) => res.json())
        .catch((error) => {
            console.error('Error fetching asset newsFeed', error);
        })
    );

    const newsFeed = useMemo(() => {
        return newsFeedData?.newsFeed?.filter((item: any) => item.language === 'en').slice(0, 6);
    }, [newsFeedData]);

    if (isLoading) return <p>Loading...</p>;

    if (error) {
        console.log(error);
        toast.error('Error fetching newsFeed');
        return <Toaster />;
    };

    if (!newsFeed) return null;

    return (
        <div className="news-section">
            <h2 className="">
                News for {assetCode}
            </h2>
            <p><i>(source: api.coinfeeds.io)</i></p>
            <ul className="news-list">
                {newsFeed?.map((newsItem: any, index: number) => (
                    <li key={`crypto-newsItem-${index}`}>
                        <Link to={newsItem.url} target="_blank" rel="noreferrer" style={{color: 'initial'}}>
                            <div className="img-wrap">
                                    <LazyLoadImage src={newsItem.image} 
                                                    width="100%"
                                                    effect="blur"
                                    />
                            </div>
                            <h4>
                                {newsItem.title}
                            </h4>
                            {newsItem.newsSiteName && <p>{newsItem.newsSiteName}</p>}
                            <p>{formatDate(newsItem.publishDate)}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LatestNews;
