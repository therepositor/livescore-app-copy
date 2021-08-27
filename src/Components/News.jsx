import React from 'react';
import NewsNavBar from './NewsNavBar';
import useDeepCompareEffect from 'use-deep-compare-effect';

const News = () =>  {
    const [headlines, setHeadlines] = React.useState([])

    
    useDeepCompareEffect(() => {

        const fetchHeadlines = async () => {
           
            const resp = await fetch("https://free-football-soccer-videos1.p.rapidapi.com/v1/", {
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": "417fbcfbbfmsh1a4fc29dfadaa6dp16235bjsn290cb241d7cc",
                    "x-rapidapi-host": "free-football-soccer-videos1.p.rapidapi.com"
                }
            })

            const data = await resp.json()
           data?.length && setHeadlines(data)
        }
           fetchHeadlines()
        }, [headlines] )

        console.log(headlines)
        
        function regexExpression(input) {
            let regex = /https?:\/\/(www.)?scorebat\.com\/?embed\/v\/\w+\/\?utm_source=api&utm_medium=video&utm_campaign=dflt/i;
            const test = regex.test(input);
            console.log(test);
           const match = input.match(regex);
           return match['0']
        }

    return  (
        <div className='news-container'>
            <div className='news_navBar'>
                <NewsNavBar />
            </div>

            <section className='thumbnail_section'>
            {headlines.map((headline, index) => {
            return (
                <div key={index} className='highlight_card'>
                    <div className='card_image'>
                        <img src={headline.thumbnail} alt={`${headline.title} thumbnail`} />
                        <span className='card_tag'>{headline.competition.name}</span>
                        <p className='card_title'>{headline.title}</p>
                        <span className='card_timestamp'></span>
                    </div>
                </div>
            )
          })}
            </section>
            <h2>Top highlights</h2>
            <section>
            {headlines.map((video, index) =>    {
                return  (
                    <div key={index} className="card_preview">
                        <p className='preview_title'>{video.title}</p>
                        <div className="preview_image">
                            <iframe title={video.title} src={`${regexExpression(video.videos[0].embed)}`} 
                            width='320' height='240' frameBorder="0"></iframe>
                        </div>
                    </div>
                )
            })}
            </section>
            <footer>
                <h4>LiveScore: Live Sport Updates</h4>
                
                <p>&copy; 1998-2021 LiveScore</p>
                <p>
                    <a href="careers.html">Careers </a> |
                    <a href="mobile.html"> Mobile </a> |
                    <a href="advertise.html"> Advertise </a> |
                    <a href="contact.html"> Contact </a> |
                    <a href="news-publishers.html"> News Publishers </a> |
                    <a href="modern-slavery-act.html"> Modern Slavery Act </a> |
                    <a href="privacy-notice.html"> Privacy Notice </a> |
                    <a href="cookie-policy.html"> Cookie Policy </a> |
                    <a href="terms-of-use.html"> Terms of Use </a> |
                    <a href="corporate.html"> Corporate </a>
                </p>
            </footer>
        </div>
    )
}

export default News